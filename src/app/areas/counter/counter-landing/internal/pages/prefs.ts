import { Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { NgClass } from '@angular/common';
import { CounterStoreService } from '../counter.store';

@Component({
  selector: 'app-counter-prefs-page',
  imports: [PageLayout, NgClass],
  template: `<app-ui-page title="Preferences">
    <div class="p-8">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4">Count By</h2>
          <p class="mb-6 text-gray-600">Select how much to increment/decrement the counter:</p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <button 
              class="btn"
              [ngClass]="store.step() === 1 ? 'btn-primary' : 'btn-outline'"
              (click)="store.setStep(1)">
              <span class="text-lg">Count by 1</span>
            </button>
            
            <button 
              class="btn"
              [ngClass]="store.step() === 3 ? 'btn-success' : 'btn-outline'"
              (click)="store.setStep(3)">
              <span class="text-lg">Count by 3</span>
            </button>
            
            <button 
              class="btn"
              [ngClass]="store.step() === 5 ? 'btn-warning' : 'btn-outline'"
              (click)="store.setStep(5)">
              <span class="text-lg">Count by 5</span>
            </button>
          </div>

          <div class="mt-8 stat bg-base-300 rounded-lg p-4">
            <div class="stat-title">Currently Selected</div>
            <div class="stat-value text-4xl">{{ store.step() }}</div>
          </div>
        </div>
      </div>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class PrefsPage {
  store = inject(CounterStoreService);
}

