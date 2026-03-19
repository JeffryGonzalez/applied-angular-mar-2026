import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DataDisplayCard } from '@ht/shared/ui-common/data-display/card';
import { CardItemText } from '@ht/shared/ui-common/data-display/card-item-text';
import { BooksApiItemModel } from './types';

@Component({
  selector: 'ht-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataDisplayCard, CardItemText],
  template: `
    <div class="grid gap-6">
      @for (book of books(); track book.id) {
        <app-ui-data-display-card [title]="book.title" [subTitle]="book.author">
          <app-ui-data-display-card-text-item label="Author" [value]="book.author" />
          <app-ui-data-display-card-text-item label="Year" [value]="book.year.toString()" />
          <app-ui-data-display-card-text-item label="Pages" [value]="book.pages.toString()" />
          <app-ui-data-display-card-text-item label="Country" [value]="book.country" />
        </app-ui-data-display-card>
      }
    </div>
  `,
  styles: ``,
})
export class BooksList {
  books = input.required<BooksApiItemModel[]>();
}
