import { Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { FizzBuzzComponent } from './fizzbuzz';
import { CounterStoreService } from '../counter.store';

@Component({
  selector: 'app-home-pages-counter',
  providers: [],
  imports: [PageLayout, FizzBuzzComponent],
  template: `<app-ui-page title="Counter">
    <div class="mb-8">
      <button class="btn btn-circle btn-warning" (click)="store.decrement()">
        -
      </button>
      <span class="text-3xl p-4">{{ store.count() }}</span>

      <button class="btn btn-circle btn-success" (click)="store.increment()">
      +
      </button>
    </div>

    <div class="text-center text-sm text-gray-500 mb-4">
      Counting by: {{ store.step() }}
    </div>

    <app-counter-fizzbuzz class="mt-8" [value]="store.count()" />

    <div class="p-8">
      <button class="btn btn-error" (click)="store.reset()" [disabled]="store.count() === 0">
        Reset
      </button>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class CounterPage {
  store = inject(CounterStoreService);
}