import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

type SortKey = 'title' | 'author' | 'year';
type SortDirection = 'asc' | 'desc';

const booksSortPreferenceKey = 'books-sort-preference';

@Component({
  selector: 'app-books-pages-prefs',
  imports: [PageLayout, RouterLink],
  template: `<app-ui-page title="Books Sorting Preferences">
    <div class="grid gap-4 max-w-md">
      <label class="flex flex-col">
        <span class="font-bold">Sort by</span>
        <select
          class="select select-bordered"
          [value]="sortKey()"
          (change)="setSortKey($any($event.target).value)"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="year">Year</option>
        </select>
      </label>

      <label class="flex flex-col">
        <span class="font-bold">Direction</span>
        <select
          class="select select-bordered"
          [value]="sortDirection()"
          (change)="setSortDirection($any($event.target).value)"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <div class="text-sm text-slate-500">
        Saved preference: {{ sortKey() }} / {{ sortDirection() }}
      </div>
      <a class="btn btn-primary btn-sm" routerLink="/books/list">Back to list</a>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class PrefsPage {
  sortKey = signal<SortKey>('title');
  sortDirection = signal<SortDirection>('asc');

  constructor() {
    this.load();
  }

  setSortKey(key: SortKey) {
    this.sortKey.set(key);
    this.save();
  }

  setSortDirection(direction: SortDirection) {
    this.sortDirection.set(direction);
    this.save();
  }

  private save() {
    const stored = { key: this.sortKey(), direction: this.sortDirection() };
    localStorage.setItem(booksSortPreferenceKey, JSON.stringify(stored));
  }

  private load() {
    try {
      const raw = localStorage.getItem(booksSortPreferenceKey);
      if (!raw) return;
      const pref = JSON.parse(raw) as { key: SortKey; direction: SortDirection };
      if (pref?.key && pref?.direction) {
        this.sortKey.set(pref.key);
        this.sortDirection.set(pref.direction);
      }
    } catch {
      // ignore
    }
  }
}
