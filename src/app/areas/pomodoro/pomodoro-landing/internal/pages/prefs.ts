import { Component, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { FormsModule } from '@angular/forms';
import { pomodoroStore } from '../../store';

@Component({
  selector: 'app--pages-timer-settings',
  imports: [PageLayout, FormsModule],
  template: `<app-ui-page title="Timer Settings">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Focus Duration</span>
        <span class="label-text-alt">{{ store.workMinutes() }} min</span>
      </label>
      <input
        type="range"
        class="range range-error"
        min="1"
        max="60"
        step="1"
        [ngModel]="store.workMinutes()"
        (ngModelChange)="store.setWorkMinutes($event)"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Break Duration</span>
        <span class="label-text-alt">{{ store.workMinutes() }} min</span>
      </label>
      <input
        type="range"
        class="range range-error"
        min="1"
        max="60"
        step="1"
        [ngModel]="store.breakMinutes()"
        (ngModelChange)="store.setBreakMinutes($event)"
      /></div
  ></app-ui-page>`,
  styles: ``,
})
export class PrefsPage {
  store = inject(pomodoroStore);
}
