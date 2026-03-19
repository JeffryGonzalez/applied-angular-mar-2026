import { Component, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { FizzBuzzComponent } from './fizzbuzz';

@Component({
  selector: 'app-home-pages-counter',
  providers: [],
  imports: [PageLayout, FizzBuzzComponent],
  template: `<app-ui-page title="Counter">
    <div class="mb-8">
      <button class="btn btn-circle btn-warning" (click)="decrement()">
        -
      </button>
      <span class="text-3xl p-4">{{ count() }}</span>

      <button class="btn btn-circle btn-success" (click)="increment()">
      +
      </button>
    </div>

    <app-counter-fizzbuzz class="mt-8" [value]="count()" />

    <div class="p-8">
      <button class="btn btn-error" (click)="reset()" [disabled]="count() === 0">
        Reset
      </button>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class CounterPage {
  count = signal(0);

  increment() {
    this.count.update(current => current + 1);
  }

  decrement() {
    this.count.update(current => current - 1);
  }

  reset() {
    this.count.set(0);
  }
}