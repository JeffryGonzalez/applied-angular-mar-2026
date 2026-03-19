import { Component, ChangeDetectionStrategy, input, inject, OnInit, computed } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { BooksStore } from '../../books-store';

@Component({
  selector: 'app-book-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col justify-center items-center my-6 join join-vertical">
      <div
        class="card bg-base-200  w-11/12 md:w-8/12 lg:w-6/12 flex flex-col md:flex-row join-item"
      >
        <figure class="w-full md:w-6/12 h-100 md:h-auto">
          <img [src]="book()?.imageLink" alt="Book Cover" class="object-cover w-full h-full " />
        </figure>
        <div class="card-body">
          <div class="mt-4 mb-8">
            <h2 class="card-title underline decoration-1">
              <a class="" [href]="book()?.link">{{ book()?.title }}</a>
            </h2>
            <p>{{ book()?.author }}</p>
          </div>

          <p class="font-medium">Country: {{ book()?.country }}</p>
          <p class="font-medium">Language: {{ book()?.language }}</p>
          <p class="font-medium">Page count: {{ book()?.pages }}</p>
          <p class="font-medium">Year: {{ book()?.year }}</p>

          <div class="card-actions  justify-between mt-10">
            <a class="btn btn-accent btn-outline" routerLink="../../">⇠ Back to List</a>

            @if (linkActive()) {
              <a class="btn btn-primary btn-outline" [href]="book()?.link">Wiki</a>
            }
          </div>
        </div>
      </div>
      <div
        class="flex justify-center  bg-base-200 w-11/12 md:w-8/12 lg:w-6/12 p-4 rounded-lg  join-item"
      >
        <button
          class="btn btn-outline btn-circle btn-secondary mx-3"
          [disabled]="!hasPrevious()"
          (click)="previous()"
        >
          ⇐
        </button>
        <button
          class="btn btn-outline btn-circle btn-secondary mx-3"
          [disabled]="!hasNext()"
          (click)="next()"
        >
          ⇒
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class DetailsComponent implements OnInit {
  store = inject(BooksStore);
  router = inject(Router);
  id = input.required<number>();

  ngOnInit() {
    this.store.setBookId(this.id());
  }

  book = computed(() => this.store.selectedBook());
  linkActive = computed(() => this.book()?.link.includes('http'));

  currentIndex = computed(() => {
    const books = this.store.books();
    return books.findIndex((b) => b.id === this.id());
  });

  hasPrevious = computed(() => this.currentIndex() > 0);
  hasNext = computed(() => this.currentIndex() < this.store.books().length - 1);

  previous() {
    const prevId = this.store.books()[this.currentIndex() - 1].id;
    this.router.navigate(['books/list/details/', prevId]);
    this.store.setBookId(prevId);
  }

  next() {
    const nextId = this.store.books()[this.currentIndex() + 1].id;
    this.router.navigate(['books/list/details/', nextId]);
    this.store.setBookId(nextId);
  }
}
