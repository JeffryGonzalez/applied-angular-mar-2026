import { Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { JsonPipe } from '@angular/common';
import { BasicCard } from '@ht/shared/ui-common/cards/basic-card';
import { Summary } from '../summary';
import { Sort } from '../sort';
import { booksStore } from '../../data/books-store';

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout, JsonPipe, BasicCard, Summary, Sort],
  template: `<app-ui-page title="List">
    <!-- TODO: implement a busyloader and do more testing using the msw with delay -->
    @if (!booksStore.isLoading()) {
      <app-ui-card-basic class="m-4" title="My Bookshelf">
        <div class="flex justify-between">
          <app-books-summary></app-books-summary>
          <app-books-sort></app-books-sort>
        </div>
      </app-ui-card-basic>
      <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        @for (book of booksStore.sortedBooks(); track book.id) {
          <app-ui-card-basic [title]="book.title">
            <div class="flex gap-1">
              <!-- TODO: make this look nicer -->
              <span>{{ book.title }}</span>
              <span>{{ book.author }}</span>
              <span>{{ book.year }}</span>
            </div>
          </app-ui-card-basic>
        }
      </div>
    }
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  booksStore = inject(booksStore);
}
