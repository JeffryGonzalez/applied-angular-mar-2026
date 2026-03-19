import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { booksStore } from '../data/books-store';

@Component({
  selector: 'ht-books-sort-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex justify-center gap-4">
      <button 
        class="btn"
        [class.btn-primary]="store.getSortField() === 'title'"
        (click)="store.setSortField('title')">
        Sort by Title
      </button>
      <button 
        class="btn"
        [class.btn-primary]="store.getSortField() === 'author'"
        (click)="store.setSortField('author')">
        Sort by Author
      </button>
      <button 
        class="btn"
        [class.btn-primary]="store.getSortField() === 'year'"
        (click)="store.setSortField('year')">
        Sort by Year
      </button>
    </div>
  `,
  styles: ``,
})
export class BooksSortControls {
  store = inject(booksStore);
}
