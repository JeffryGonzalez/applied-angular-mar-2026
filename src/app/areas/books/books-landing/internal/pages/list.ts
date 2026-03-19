import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../types';
import { JsonPipe } from '@angular/common';
import { BasicCard } from '@ht/shared/ui-common/cards/basic-card';

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout, JsonPipe, BasicCard],
  template: `<app-ui-page title="List">
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
