import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BookEntity } from '../types';
import { BooksStore } from '../../books-store';

@Component({
  selector: 'app-books-pages-list',
  imports: [PageLayout],
  template: `<app-ui-page title="List">
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          @for (book of store.books(); track book.id) {
            <tr>
              <th></th>
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.country }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class ListPage {
  booksResource = httpResource<BookEntity[]>(() => '/api/books');
  store = inject(BooksStore);
}
