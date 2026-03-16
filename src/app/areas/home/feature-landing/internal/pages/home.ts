import { Component, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'ht-home-home',
  imports: [PageLayout],
  template: `
    <app-ui-page title="Angular">
      <p>Welcome to the Angular Starter Project.</p>
      <div>
        <button (click)="decrement()" class="btn btn-warning btn-circle">-</button>
        <span class="text-3xl p-4">{{ current() }}</span>
        <button (click)="increment()" class="btn btn-primary btn-circle">+</button>
        <button (click)="current.set(0)" class="btn btn-primary">Reset</button>
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  protected readonly current = signal(0);

  decrement() {
    this.current.set(this.current() - 1);
    // if you write code here that takes longer than that 16.667 - it will "block" the update of the display.
    // we have to things fast or not at all - some things can never be faster that 16.667 milliseconds, so we can't do them synchronously
    // "whenever it is done" - async
  }

  increment() {
    // Kent Beck's Four Rules of Simple Design
    // "fewest number of elements" - prefer techniquest that require less decisions, loops and variables.
    this.current.update((c) => c + 1);
  }
}
