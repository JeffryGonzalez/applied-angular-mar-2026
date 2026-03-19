import { Component, inject } from '@angular/core';
import { booksStore } from '../data/books-store';

@Component({
  selector: 'app-books-sort',
  imports: [],
  template: `<div class="flex flex-col">
    <div class="flex justify-center-safe mb-1"><h2>Sort By</h2></div>
    <div class="flex">
      <!-- TODO: was getting bogged down in UI choices so I went simple, but coming up with a better design and implementing asc/desc would be neat -->
      <button
        class="btn"
        [disabled]="booksStore.sort() === 'title'"
        (click)="booksStore.sortBy('title')"
      >
        Title
      </button>
      <button
        class="btn"
        [disabled]="booksStore.sort() === 'author'"
        (click)="booksStore.sortBy('author')"
      >
        Author
      </button>
      <button
        class="btn"
        [disabled]="booksStore.sort() === 'year'"
        (click)="booksStore.sortBy('year')"
      >
        Year
      </button>
    </div>
  </div>`,
  styles: ``,
})
export class Sort {
  booksStore = inject(booksStore);
}
