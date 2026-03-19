import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BooksApiItemModel } from '../../../types';

@Component({
  selector: 'app-books-pages-details',
  imports: [PageLayout, RouterLink],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class BooksDetailsPage {
  private route = inject(ActivatedRoute);
  bookId = this.route.snapshot.paramMap.get('id') ?? '';

  booksResource = httpResource<BooksApiItemModel[]>(() => '/api/books');

  selectedBook = computed(() => {
    const books = this.booksResource.value() || [];
    return books.find((book) => book.id === this.bookId) || null;
  });
}
