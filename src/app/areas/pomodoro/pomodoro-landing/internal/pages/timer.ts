import { Component } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app--pages-',
  imports: [PageLayout],
  template: `<app-ui-page title="Pomodoro Timer">
    <div class="flex flex-col items-center gap-6 py-4">
      <!-- Mode badge -->
      <div class="badge badge-lg badge-error">Focus</div>

      <!-- Timer display -->
      <div class="text-6xl font-mono font-bold text-error">25:00</div>

      <!-- Controls -->
      <div class="flex gap-4">
        <button class="btn btn-primary w-24">Start</button>
        <button class="btn btn-ghost">Reset</button>
      </div>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class TimerPage {}
