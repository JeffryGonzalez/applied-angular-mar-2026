import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookEntity } from './internal/types';

export class BookApi {
  #http = inject(HttpClient);

  getBooks() {
    return this.#http.get<BookEntity[]>('/api/books');
  }

  addBook(book: Partial<BookEntity>) {
    return this.#http.post<BookEntity>('/api/books', book);
  }

  deleteBook(id: BookEntity['id']) {
    return this.#http.delete<{ success: boolean }>(`/api/books/${id}`);
  }
}
