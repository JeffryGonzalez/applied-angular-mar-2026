import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterStoreService {
  step = signal(1);

  setStep(value: number) {
    this.step.set(value);
  }
}
