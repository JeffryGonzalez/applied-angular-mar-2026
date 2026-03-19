import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../types';

@Component({
  selector: 'app-books-pages-details',
  imports: [PageLayout, RouterLink],
  template: `<app-ui-page title="Book Details">
    @if (booksResource.isLoading()) {
      <span class="loading loading-spinner text-primary"></span>
    } @else {
      @if (!selectedBook()) {
        <div class="alert alert-error">Book not found</div>
        <a class="btn btn-xs btn-primary" routerLink="/books/list">Back to list</a>
      } @else {
        <div class="card bg-base-200 p-4 rounded-lg space-y-2">
          <div><strong>ID:</strong> {{ selectedBook()?.id }}</div>
          <div><strong>Title:</strong> {{ selectedBook()?.title }}</div>
          <div><strong>Author:</strong> {{ selectedBook()?.author }}</div>
          <div><strong>Country:</strong> {{ selectedBook()?.country }}</div>
          <div><strong>Language:</strong> {{ selectedBook()?.language }}</div>
          <div><strong>Pages:</strong> {{ selectedBook()?.pages }}</div>
          <div><strong>Year:</strong> {{ selectedBook()?.year }}</div>
        </div>
      }
    }
    <div class="mt-3">
      <a class="btn btn-sm btn-outline" routerLink="/books/list">Back to list</a>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class DetailsPage {
  private route = inject(ActivatedRoute);
  bookId = this.route.snapshot.paramMap.get('id') ?? '';

  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  selectedBook = computed(() => {
    const books = this.booksResource.value() || [];
    return books.find((book) => book.id === this.bookId) || null;
  });
}
