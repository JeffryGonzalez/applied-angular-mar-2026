import { computed } from "@angular/core";
import { signalStore, withComputed, withHooks } from "@ngrx/signals";
import { withEntities } from "@ngrx/signals/entities";

export type Book = {
    id: string;
    author: string;
    title: string;
    year: number;
    pages: number;
    country: string;
};

export const booksStore = signalStore(
    withEntities<Book>(),
    withComputed((store) => {
        return {
            allBooks: computed(() => store.entities()),
            totalBooks: computed(() => store.entities().length),
        };
    }),
    withHooks({
        onInit() {
            console.log('Books store initialized');
        }
    })
);