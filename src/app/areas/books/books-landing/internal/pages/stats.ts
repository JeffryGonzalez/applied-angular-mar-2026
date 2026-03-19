import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../types';

@Component({
  selector: 'app-books-pages-stats',
  imports: [PageLayout, DecimalPipe],
  template: `<app-ui-page title="Books Stats">
    @if (booksResource.isLoading()) {
      <span class="loading loading-spinner text-primary"></span>
    } @else {
      <div class="grid lg:grid-cols-2 gap-4">
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Total Books</div>
          <div class="text-2xl">{{ stats().totalBooks }}</div>
        </div>
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Total Pages</div>
          <div class="text-2xl">{{ stats().totalPages }}</div>
        </div>
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Average Pages</div>
          <div class="text-2xl">{{ stats().averagePages | number: '1.0-1' }}</div>
        </div>
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Earliest Year</div>
          <div class="text-2xl">{{ stats().earliestYear ?? 'n/a' }}</div>
        </div>
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Latest Year</div>
          <div class="text-2xl">{{ stats().latestYear ?? 'n/a' }}</div>
        </div>
        <div class="card bg-base-200 p-4 rounded-lg">
          <div class="font-bold">Longest Book Title(s)</div>
          <div>{{ stats().longestTitles.join(', ') || 'n/a' }}</div>
        </div>
      </div>
    }
  </app-ui-page>`,
  styles: ``,
})
export class StatsPage {
  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  stats = computed(() => {
    const books = this.booksResource.value() || [];
    const totalBooks = books.length;
    const totalPages = books.reduce((sum, item) => sum + (item.pages ?? 0), 0);
    const averagePages = totalBooks > 0 ? totalPages / totalBooks : 0;
    const years = books.map((item) => item.year).filter((val): val is number => !!val);
    const earliestYear = years.length ? Math.min(...years) : undefined;
    const latestYear = years.length ? Math.max(...years) : undefined;
    const maxPages = books.length ? Math.max(...books.map((item) => item.pages)) : 0;
    const longestTitles = books.filter((item) => item.pages === maxPages).map((item) => item.title);

    return { totalBooks, totalPages, averagePages, earliestYear, latestYear, longestTitles };
  });
}
