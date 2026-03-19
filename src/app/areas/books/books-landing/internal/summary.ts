import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { BasicCard } from '@ht/shared/ui-common/cards/basic-card';
import { BooksApiItemModel } from './types';

@Component({
  selector: 'app-books-summary',
  imports: [BasicCard],
  template: `<app-ui-card-basic title="My Bookshelf">
    <p>
      Your collection contains
      <span class="text-2xl text-secondary">{{ totalBooks() }}</span> books.
    </p>
    <p>
      The oldest book was published in
      <span class="text-2xl text-secondary">{{ earliestYear() }}</span
      >. The newest was published in <span class="text-2xl text-secondary">{{ latestYear() }}</span
      >.
    </p>
    <p>
      The average book in your collection is
      <span class="text-2xl text-secondary">{{ averagePages() }}</span> pages long.
    </p>
  </app-ui-card-basic>`,
  styles: ``,
})
export class Summary {
  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  totalBooks = computed(() => this.booksResource.value()?.length || 0);

  booksSortedByYear = computed(() => {
    const books = this.booksResource.value();

    return books?.toSorted((book) => book.year);
  });

  earliestYear = computed(() => {
    const booksByYear = this.booksSortedByYear();

    return booksByYear?.[0].year;
  });

  latestYear = computed(() => {
    const booksByYear = this.booksSortedByYear();

    return booksByYear?.[booksByYear.length - 1].year;
  });

  averagePages = computed(() => {
    const books = this.booksResource.value();

    if (!books || books.length < 1) {
      return 0;
    }

    const totalPages = books.reduce((prev, current) => prev + current.pages, 0);
    return totalPages / books.length;
  });
}
