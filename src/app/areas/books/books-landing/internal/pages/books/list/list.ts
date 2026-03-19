import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { RouterLink } from '@angular/router';
import { BooksApiItemModel } from '../../../types';

type BooksSortKey = 'title' | 'author' | 'year';
type BooksSortDirection = 'asc' | 'desc';

const booksSortPreferenceKey = 'books-sort-preference';

interface BooksSortPreference {
  key: BooksSortKey;
  direction: BooksSortDirection;
}

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout, RouterLink, TitleCasePipe, DecimalPipe],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class BooksListPage {
  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  sortKey = signal<BooksSortKey>('title');
  sortDirection = signal<BooksSortDirection>('asc');

  books = computed(() => this.booksResource.value() || []);

  sortedBooks = computed(() => {
    const current = [...this.books()];
    const key = this.sortKey();
    const dir = this.sortDirection();

    current.sort((a, b) => {
      const left = a[key];
      const right = b[key];

      if (typeof left === 'string' && typeof right === 'string') {
        const compare = left.localeCompare(right, undefined, { sensitivity: 'base' });
        return dir === 'asc' ? compare : -compare;
      }

      if (typeof left === 'number' && typeof right === 'number') {
        return dir === 'asc' ? left - right : right - left;
      }

      return 0;
    });

    return current;
  });

  stats = computed(() => {
    const all = this.books();
    const total = all.length;
    const totalPages = all.reduce((sum, book) => sum + (book.pages ?? 0), 0);

    const averagePages = total > 0 ? totalPages / total : 0;
    const maxPages = Math.max(0, ...all.map((book) => book.pages ?? 0));
    const longestTitles = all.filter((book) => book.pages === maxPages).map((book) => book.title);

    const years = all.map((book) => book.year).filter((year) => typeof year === 'number');
    const earliestYear = years.length ? Math.min(...years) : undefined;
    const latestYear = years.length ? Math.max(...years) : undefined;

    return {
      totalBooks: total,
      totalPages,
      averagePages,
      longestTitles,
      earliestYear,
      latestYear,
    };
  });

  constructor() {
    this.loadSortPreference();
  }

  setSort(key: BooksSortKey) {
    if (this.sortKey() === key) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
    this.saveSortPreference();
  }

  private loadSortPreference() {
    try {
      const raw = localStorage.getItem(booksSortPreferenceKey);
      if (!raw) return;
      const pref = JSON.parse(raw) as BooksSortPreference;
      if (pref?.key && pref?.direction) {
        this.sortKey.set(pref.key);
        this.sortDirection.set(pref.direction);
      }
    } catch {
      // ignore
    }
  }

  private saveSortPreference() {
    const data: BooksSortPreference = {
      key: this.sortKey(),
      direction: this.sortDirection(),
    };
    localStorage.setItem(booksSortPreferenceKey, JSON.stringify(data));
  }
}
