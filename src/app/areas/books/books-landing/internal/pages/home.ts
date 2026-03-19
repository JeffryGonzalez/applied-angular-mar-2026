import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { booksStore } from '../../data/books-store';
import { BooksList } from '../books-list';
import { BooksStatistics } from '../books-statistics';
import { BooksSortControls } from '../books-sort-controls';

@Component({
  selector: 'ht-books-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, BooksList, BooksStatistics, BooksSortControls],
  template: `<app-ui-page title="Books">
    <div class="space-y-6">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <ht-books-statistics [books]="store.allBooks()" />
        </div>
      </div>
      
      <ht-books-sort-controls />
      
      <ht-books-list [books]="store.allBooksAscending()" />
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class HomePage {
  store = inject(booksStore);
  
}
