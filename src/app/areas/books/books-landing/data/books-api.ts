import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BooksApiItemModel } from '../internal/types';

export class BooksApi {
  #client = inject(HttpClient);

  getBooks() {
    return this.#client.get<BooksApiItemModel[]>('/api/books');
  }
}
