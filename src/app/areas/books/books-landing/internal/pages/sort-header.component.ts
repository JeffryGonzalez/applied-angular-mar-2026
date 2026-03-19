import { Component, input, inject } from '@angular/core';
import { ColumnPrefs, BooksStore } from '../../books-store';

@Component({
  selector: 'app-sort-header',
  standalone: true,
  template: `
    <div
      class="flex flex-nowrap cursor-pointer"
      (click)="store.setColumnPref(column())"
      (keydown)="store.setColumnPref(column())"
      tabindex="0"
    >
      <ng-content></ng-content>
      @if (store.column() === column()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 mx-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            [attr.d]="
              store.ascending() ? 'm19.5 8.25-7.5 7.5-7.5-7.5' : 'm4.5 15.75 7.5-7.5 7.5 7.5'
            "
          />
        </svg>
      }
    </div>
  `,
})
export class SortHeaderComponent {
  column = input.required<ColumnPrefs>();
  store = inject(BooksStore);
}
