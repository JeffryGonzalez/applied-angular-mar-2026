import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksStore, ColumnPrefs } from '../../books-store';
import { SortHeaderComponent } from './sort-header.component';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SortHeaderComponent],
  template: `
    <div class="flex justify-center">
      <div class="bg-base-200 p-4 rounded-lg shadow-lg">
        <!-- <div class="flex justify-center mb-4">
          <a routerLink="entry" class="btn btn-accent btn-outline"
            >Add Book <span class="font-semibold text-lg">+</span></a
          >
        </div> -->
        <div class="overflow-x-auto max-h-[80vh] max-w-[90vh] min-w-[70vw]">
          <table class="table table-zebra table-pin-rows bg-base-300  font-medium">
            <thead>
              <tr class="bg-neutral">
                <th class="cursor-pointer" (click)="handleSort('id')">
                  <app-sort-header column="id">Id</app-sort-header>
                </th>
                <th class="cursor-pointer" (click)="handleSort('title')">
                  <app-sort-header column="title">Title</app-sort-header>
                </th>
                <th class="cursor-pointer" (click)="handleSort('author')">
                  <app-sort-header column="author">Author</app-sort-header>
                </th>
                <th class="cursor-pointer" (click)="handleSort('year')">
                  <app-sort-header column="year">Year</app-sort-header>
                </th>
              </tr>
            </thead>
            <tbody>
              @for (book of store.books(); track book.id) {
                <tr>
                  <td>{{ book.id }}</td>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="w-20 rounded">
                          <a class="link" [routerLink]="['details', book.id]"
                            ><img [src]="book.imageLink" alt=""
                          /></a>
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          <a class="link" [routerLink]="['details', book.id]">{{ book.title }}</a>
                        </div>
                      </div>
                      @if (book.custom) {
                        <div class="tooltip" data-tip="Delete Entry">
                          <button
                            class="btn btn-ghost btn-circle text-secondary"
                            (click)="deleteBook(book.id)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      }
                    </div>
                  </td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.year }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BooksStore);
  books = this.store.books;

  handleSort(column: ColumnPrefs) {
    if (this.store.column() === column) {
      this.store.setDirection(!this.store.ascending());
    }
    this.store.setColumnPref(column);
  }
  deleteBook(id: number) {
    this.store.deleteBook(id);
  }
}
