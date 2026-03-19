import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../types';
import { JsonPipe } from '@angular/common';
import { BasicCard } from '@ht/shared/ui-common/cards/basic-card';
import { Summary } from '../summary';
import { Sort } from '../sort';

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout, JsonPipe, BasicCard, Summary, Sort],
  template: `<app-ui-page title="List">
    <app-ui-card-basic class="m-4" title="My Bookshelf">
      <div class="flex justify-between">
        <app-books-summary></app-books-summary>
        <app-books-sort></app-books-sort>
      </div>
    </app-ui-card-basic>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      @for (book of booksResource.value(); track book.id) {
        <app-ui-card-basic [title]="book.title">
          <div class="flex gap-1">
            <span>{{ book.title }}</span>
            <span>{{ book.author }}</span>
            <span>{{ book.year }}</span>
          </div>
        </app-ui-card-basic>
      }
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');
}
