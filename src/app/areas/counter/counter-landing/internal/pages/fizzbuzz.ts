import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-counter-fizzbuzz',
  imports: [NgClass],
  template: `
    <div class="flex justify-center">
      <div [ngClass]="statusClass()" class="stat w-64">
        <div class="stat-figure text-5xl">
          <span [class]="statusIcon()">{{ iconSymbol() }}</span>
        </div>
        <div class="stat-title">FizzBuzz Status</div>
        <div class="stat-value text-2xl">{{ fizzbuzzValue() }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class FizzBuzzComponent {
  value = input.required<number>();

  fizzbuzzValue() {
    const val = this.value();
    if (val % 15 === 0) return 'FizzBuzz';
    if (val % 3 === 0) return 'Fizz';
    if (val % 5 === 0) return 'Buzz';
    return val.toString();
  }

  statusClass = computed(() => {
    const val = this.value();
    if (val % 15 === 0) return 'stat bg-purple-100 border-2 border-purple-400';
    if (val % 3 === 0) return 'stat bg-blue-100 border-2 border-blue-400';
    if (val % 5 === 0) return 'stat bg-green-100 border-2 border-green-400';
    return 'stat bg-gray-100 border-2 border-gray-400';
  });

  iconSymbol = computed(() => {
    const val = this.value();
    if (val % 15 === 0) return '⭐';
    if (val % 3 === 0) return '🔵';
    if (val % 5 === 0) return '🟢';
    return '⚪';
  });

  statusIcon = computed(() => {
    const val = this.value();
    if (val % 15 === 0) return 'text-purple-600';
    if (val % 3 === 0) return 'text-blue-600';
    if (val % 5 === 0) return 'text-green-600';
    return 'text-gray-600';
  });
}

