import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { DataDisplayCard } from '@ht/shared/ui-common/data-display/card';
import { CardItemText } from '@ht/shared/ui-common/data-display/card-item-text';
import { BooksApiItemModel } from './types';

@Component({
  selector: 'ht-books-statistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataDisplayCard, CardItemText],
  template: `
    <app-ui-data-display-card title="Books Statistics" [subTitle]="'Overview of your book collection'">
      <app-ui-data-display-card-text-item label="Total Books" [value]="totalBooks().toString()" />
      <app-ui-data-display-card-text-item label="Average Pages" [value]="averagePages().toString()" />
      <app-ui-data-display-card-text-item label="Longest Book(s)" [value]="longestBookTitles()" />
      <app-ui-data-display-card-text-item label="Earliest Date" [value]="earliestYear().toString()" />
      <app-ui-data-display-card-text-item label="Latest Date" [value]="latestYear().toString()" />
    </app-ui-data-display-card>
  `,
  styles: ``,
})
export class BooksStatistics {
  books = input.required<BooksApiItemModel[]>();

  totalBooks = computed(() => this.books().length);

  averagePages = computed(() => {
    const books = this.books();
    if (books.length === 0) return 0;
    const total = books.reduce((sum, book) => sum + book.pages, 0);
    return Math.round(total / books.length);
  });

  longestBookTitles = computed(() => {
    const books = this.books();
    if (books.length === 0) return [];
    const maxPages = Math.max(...books.map(b => b.pages));
    const longestBooks = books.filter(b => b.pages === maxPages).map(b => b.title);
    return longestBooks;
  });

  earliestYear = computed(() => {
    const books = this.books();
    if (books.length === 0) return 0;
    return Math.min(...books.map(b => b.year));
  });

  latestYear = computed(() => {
    const books = this.books();
    if (books.length === 0) return 0;
    return Math.max(...books.map(b => b.year));
  });
}
