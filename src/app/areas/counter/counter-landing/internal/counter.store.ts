import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterStoreService {
  step = signal(1);
  count = signal(0);

  setStep(value: number) {
    this.step.set(value);
  }

  increment() {
    this.count.update(current => current + this.step());
  }

  decrement() {
    this.count.update(current => current - this.step());
  }

  reset() {
    this.count.set(0);
  }
}

