import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { BooksApiItemModel } from '../internal/types';
import { computed } from '@angular/core';
import { httpResource } from '@angular/common/http';

export type BookSortOption = 'title' | 'author' | 'year';

type BookState = {
  sort: BookSortOption;
};

export const booksStore = signalStore(
  withDevtools('Books Store'),
  withState<BookState>({ sort: 'title' }),
  // TODO: I was able to get loading the books via httpResource in the store working but it's a little janky with the multiple withComputed, would like to revisit this
  withProps(() => {
    return {
      _books: httpResource<BooksApiItemModel[]>(() => '/api/books'),
    };
  }),
  withComputed((store) => {
    return {
      isLoading: computed(() => store._books.isLoading()),
      books: computed(() => {
        return store._books.value() || [];
      }),
    };
  }),
  withComputed((store) => {
    return {
      // TODO: I don't think I took the best approach since now I'd have to duplicate code to get some of my stats from different sorts, probably needs a rethink
      sortedBooks: computed(() => {
        const sort = store.sort();

        return store.books().toSorted((book1, book2) => {
          if (sort === 'year') {
            return book1.year - book2.year;
          } else if (sort === 'author') {
            return book1.author.localeCompare(book2.author);
          } else {
            return book1.title.localeCompare(book2.title);
          }
        });
      }),
      totalBooks: computed(() => store.books().length),
    };
  }),

  withMethods((store) => {
    return {
      sortBy: (sort: BookSortOption) => patchState(store, { sort }),
    };
  }),
);
