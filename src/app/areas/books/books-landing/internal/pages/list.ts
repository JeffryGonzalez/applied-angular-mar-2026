import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../types';
import { RouterLink } from '@angular/router';

type SortKey = 'title' | 'author' | 'year';
type SortDirection = 'asc' | 'desc';

const booksSortPreferenceKey = 'books-sort-preference';

interface BooksSortPreference {
  key: SortKey;
  direction: SortDirection;
}

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout, RouterLink, TitleCasePipe, DecimalPipe],
  template: `<app-ui-page title="Books List">
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <a class="btn btn-sm btn-primary" routerLink="/books/stats">Stats</a>
      <a class="btn btn-sm btn-secondary" routerLink="/books/prefs">Prefs</a>
      <span class="badge badge-outline"
        >Sort: {{ sortKey() | titlecase }} ({{ sortDirection() }})</span
      >
    </div>

    <div class="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm bg-base-200 p-3 rounded-lg">
      <div>Total:</div>
      <div>{{ books().length }}</div>
      <div>Pages Total:</div>
      <div>{{ stats().totalPages }}</div>
      <div>Average Pages:</div>
      <div>{{ stats().averagePages | number: '1.0-1' }}</div>
      <div>Longest Book(s):</div>
      <div>{{ stats().longestTitles.join(', ') || 'n/a' }}</div>
      <div>Earliest Year:</div>
      <div>{{ stats().earliestYear ?? 'n/a' }}</div>
      <div>Latest Year:</div>
      <div>{{ stats().latestYear ?? 'n/a' }}</div>
    </div>

    @if (booksResource.isLoading()) {
      <span class="loading loading-spinner text-primary"></span>
    } @else {
      @if (books().length === 0) {
        <div class="alert alert-warning">No books found.</div>
      } @else {
        <div class="overflow-x-auto">
          <table class="table w-full table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <button class="btn btn-ghost btn-xs" (click)="setSort('title')">Title</button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" (click)="setSort('author')">Author</button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" (click)="setSort('year')">Year</button>
                </th>
              </tr>
            </thead>
            <tbody>
              @for (book of sortedBooks(); track book.id) {
                <tr>
                  <td>{{ book.id }}</td>
                  <td>
                    <a class="link link-primary" [routerLink]="['/books/details', book.id]">{{
                      book.title
                    }}</a>
                  </td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.year }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    }
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  sortKey = signal<SortKey>('title');
  sortDirection = signal<SortDirection>('asc');

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

  setSort(key: SortKey) {
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
