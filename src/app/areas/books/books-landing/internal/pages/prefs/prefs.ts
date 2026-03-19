import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

type SortKey = 'title' | 'author' | 'year';
type SortDirection = 'asc' | 'desc';

const booksSortPreferenceKey = 'books-sort-preference';

@Component({
  selector: 'app-books-pages-prefs',
  imports: [PageLayout, RouterLink],
  templateUrl: './prefs.html',
  styleUrls: ['./prefs.css'],
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
    localStorage.setItem(booksSortPreferenceKey, JSON.stringify({
      key: this.sortKey(),
      direction: this.sortDirection(),
    }));
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
