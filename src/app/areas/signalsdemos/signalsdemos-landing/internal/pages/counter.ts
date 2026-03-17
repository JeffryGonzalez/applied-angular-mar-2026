import { Component, computed, effect, inject, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-pages-counter',
  imports: [PageLayout],
  template: `<app-ui-page title="Counter">
    <div>
      <button
        [disabled]="shouldBeDisabled()"
        (click)="decrement()"
        class="btn btn-circle btn-warning"
      >
        -
      </button>
      <span class="text-3xl p-4">{{ current() }}</span
      ><span>{{ emoji() }}</span>

      <button (click)="increment()" class="btn btn-circle btn-success">+</button>
    </div>
    <div class="p-8">
      <button
        [disabled]="shouldBeDisabled()"
        (click)="current.set(0)"
        class="btn btn-md btn-primary"
      >
        Reset
      </button>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class CounterPage {
  // RUG - Repeat Until Good.
  // inside of a component, you should use signals for any state. This should be your default.
  // You may use inputs (later), but those should be signals
  // observables (rxjs) are allowed, but we are hopefully migrating away from that.
  // current = signal(42);
  current = signal(0);

  title = inject(Title);

  constructor() {
    // effects are saying "do this when the enclosed signal changes."
    effect(() => {
      this.title.setTitle(this.emoji());
    });
  }

  shouldBeDisabled = computed(() => {
    const current = this.current(); // this is saying watch this signal, if it changes, reeevaluate everything in this computed
    return current === 0;
  });

  emoji = computed(() => '💾'.repeat(this.current()));

  increment() {
    this.current.update((c) => c + 1);
  }

  decrement() {
    this.current.update((c) => c - 1);
  }
}
