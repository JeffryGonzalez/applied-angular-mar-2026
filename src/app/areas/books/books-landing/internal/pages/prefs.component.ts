import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../../books-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="max-w-md mx-auto">
      <div class="my-4">
        <div class="stat-value text-primary text-lg ">Sort By:</div>
        <div id="count-tab" role="tablist" class="tabs tabs-boxed">
          @for (option of store.columnPrefs(); track option) {
            <a
              role="tab"
              [class]="'tab ' + (option === store.column() ? 'tab-active' : '')"
              tabindex="0"
              (click)="store.setColumnPref(option)"
              (keydown.enter)="store.setColumnPref(option)"
            >
              {{ option }}
            </a>
          }
        </div>
      </div>

      <div class="my-4">
        <div class="stat-value text-primary text-lg">Sort Direction:</div>
        <div role="tablist" class="tabs tabs-boxed">
          <a
            role="tab"
            class="tab"
            [class.tab-active]="store.ascending()"
            (click)="store.setDirection(true)"
            (keydown)="store.setDirection(true)"
            tabindex="0"
          >
            Ascending
          </a>
          <a
            role="tab"
            class="tab"
            [class.tab-active]="!store.ascending()"
            (click)="store.setDirection(false)"
            (keydown)="store.setDirection(false)"
            tabindex="0"
          >
            Descending
          </a>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(BooksStore);
}
