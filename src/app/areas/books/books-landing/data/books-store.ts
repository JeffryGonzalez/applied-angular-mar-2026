import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
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
  withProps(() => {
    return {
      _books: httpResource<BooksApiItemModel[]>(() => '/api/books'),
    };
  }),
  withComputed((store) => {
    return {
      books: computed(() => {
        return store._books.value() || [];
      }),
    };
  }),
  withComputed((store) => {
    return {
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
    };
  }),

  withMethods((store) => {
    return {
      sortBy: (sort: BookSortOption) => patchState(store, { sort }),
    };
  }),
);
