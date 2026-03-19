import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type BookSortOption = 'title' | 'author' | 'year';

type BookState = {
  sort: BookSortOption;
};

export const booksStore = signalStore(
  withDevtools('Books Store'),
  withState<BookState>({ sort: 'title' }),
  withMethods((store) => {
    return {
      sortBy: (sort: BookSortOption) => patchState(store, { sort }),
    };
  }),
);
