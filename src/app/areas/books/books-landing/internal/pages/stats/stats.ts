import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../../types';

@Component({
  selector: 'app-books-pages-stats',
  imports: [PageLayout, DecimalPipe],
  templateUrl: './stats.html',
  styleUrls: ['./stats.css'],
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
