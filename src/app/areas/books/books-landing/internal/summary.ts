import { Component, computed, inject } from '@angular/core';
import { booksStore } from '../data/books-store';

@Component({
  selector: 'app-books-summary',
  imports: [],
  template: `<p>
      Your collection contains
      <span class="text-2xl text-secondary">{{ booksStore.totalBooks() }}</span> books.
    </p>
    @if (booksStore.totalBooks() > 0) {
      <p>
        The oldest book was published in
        <span class="text-2xl text-secondary">{{ earliestYear() }}</span
        >. The newest was published in
        <span class="text-2xl text-secondary">{{ latestYear() }}</span
        >.
      </p>
      <p>
        The average book in your collection is
        <span class="text-2xl text-secondary">{{ averagePages() }}</span> pages long.
      </p>
    } @else {
      <p>Add books to see your stats! This is not implemented but we can pretend, right?</p>
    } `,
  styles: ``,
})
export class Summary {
  booksStore = inject(booksStore);

  booksSortedByYear = computed(() => {
    const books = this.booksStore.books();

    return books?.toSorted((book) => book.year);
  });

  earliestYear = computed(() => {
    const booksByYear = this.booksSortedByYear();

    return booksByYear?.[0]?.year;
  });

  latestYear = computed(() => {
    const booksByYear = this.booksSortedByYear();

    return booksByYear?.[booksByYear.length - 1]?.year;
  });

  averagePages = computed(() => {
    const books = this.booksStore.books();

    if (!books || books.length < 1) {
      return 0;
    }

    const totalPages = books.reduce((prev, current) => prev + current.pages, 0);
    return totalPages / books.length;
  });
}
