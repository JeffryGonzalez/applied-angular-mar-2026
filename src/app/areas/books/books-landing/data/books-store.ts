import { computed, inject, signal } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods } from "@ngrx/signals";
import { setEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap } from "rxjs/internal/operators/tap";
import { BooksApi } from "./books-api";
import { pipe } from "rxjs/internal/util/pipe";
import { exhaustMap } from "rxjs/internal/operators/exhaustMap";
import { BooksApiItemModel } from "../internal/types";

export type SortField = 'title' | 'author' | 'year';

export const booksStore = signalStore(
    withEntities<BooksApiItemModel>(),
   withMethods((store) => {
        const api = inject(BooksApi);
        const sortField = signal<SortField>('title');

        return {
            _loadBooks: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            api.getBooks().pipe(tap((books) => patchState(store, setEntities(books)))),
          ),
        ),
      ),
            setSortField: (field: SortField) => sortField.set(field),
            getSortField: computed(() => sortField())
    }
}),

    withComputed((store) => {
        return {
            allBooks: computed(() => store.entities()),
            totalBooks: computed(() => {
                const books = store.entities();
                return books.length;
            }),
            allBooksAscending: computed(() => {
                const books = store.entities();
                const sortField = store.getSortField();
                return [...books].sort((a, b) => {
                    if (sortField === 'year') {
                        return a.year - b.year;
                    } else if (sortField === 'author') {
                        return a.author.localeCompare(b.author);
                    } else {
                        return a.title.localeCompare(b.title);
                    }
                });
            })
        };
    }),
    withHooks({
        onInit(store) {
            store._loadBooks();
        }
    })
);