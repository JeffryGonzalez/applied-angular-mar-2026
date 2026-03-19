import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BooksStore } from '../../books-store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex flex-col items-center">
      <div class="stat-value text-primary text-xl">Stats:</div>
      <div class="stats stats-vertical shadow bg-base-200">
        <div class="stat">
          <div class="stat-title ">Total Books:</div>
          <div class="stat-value text-primary">{{ totalBooks() }}</div>
          <div class="stat-desc ">Every book every written!</div>
        </div>
        <div class="stat">
          <div class="stat-title">Average Length:</div>
          <div class="stat-value text-primary">{{ averagePages().pages }}</div>

          <div class="stat-desc">Page Count</div>
        </div>

        <div class="stat">
          <div class="stat-title">Oldest Book:</div>
          <div class="stat-value text-primary">{{ earliestBook().title }}</div>
          <div class="stat-desc">Published: {{ earliestBook().year }}</div>
          <div class="stat-figure text-secondary">
            <div class="avatar ">
              <div class="w-16 rounded-full">
                <img [src]="earliestBook().imageLink" alt="" />
              </div>
            </div>
          </div>
          <div class="stat-desc">
            {{ earliestBook().year < 0 ? 'BC' : 'AD' }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">Newest Book:</div>
          <div class="stat-value text-primary">{{ newestBook().title }}</div>
          <div class="stat-desc">Published: {{ newestBook().year }}</div>
          <div class="stat-figure text-secondary">
            <div class="avatar ">
              <div class="w-16 rounded-full">
                <img [src]="newestBook().imageLink" alt="" />
              </div>
            </div>
          </div>
          <div class="stat-desc">{{ newestBook().year < 0 ? 'BC' : 'AD' }}</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  store = inject(BooksStore);
  books = this.store.books;

  totalBooks = computed(() => this.books().length);

  earliestBook = computed(() => {
    return this.store
      .books()
      .reduce((earliest, current) => (current.year < earliest.year ? current : earliest));
  });

  newestBook = computed(() => {
    return this.store
      .books()
      .reduce((newest, current) => (current.year > newest.year ? current : newest));
  });

  averagePages = computed(() => {
    const books = this.store.books();
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    const avgPages = Math.round(totalPages / books.length);
    return books.reduce((closest, current) =>
      Math.abs(current.pages - avgPages) < Math.abs(closest.pages - avgPages) ? current : closest,
    );
  });
}
