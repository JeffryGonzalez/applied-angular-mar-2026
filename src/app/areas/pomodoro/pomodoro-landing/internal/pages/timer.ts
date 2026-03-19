import { Component, signal, computed, inject, DestroyRef } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app--pages-',
  imports: [PageLayout],
  template: `<app-ui-page title="Pomodoro Timer">
    <div class="flex flex-col items-center gap-6 py-4">
      <!-- Mode badge -->
      <div class="badge badge-lg badge-error">Focus</div>

      <!-- Timer display -->
      <div
        class="radial-progress text-2xl font-mono font-bold text-error"
        [style.--value]="progressPercent()"
        [style.--size]="'12rem'"
        [style.--thickness]="'8px'"
        role="progressbar"
        data-testid="time-display"
      >
        {{ formattedTime() }}
      </div>

      <!-- Controls -->
      <div class="flex gap-4">
        <button class="btn btn-primary w-24" (click)="toggleTimer()">{{ startLabel() }}</button>
        <button class="btn btn-ghost" (click)="reset()">Reset</button>
      </div>
    </div>
  </app-ui-page>`,
  styles: ``,
})
export class TimerPage {
  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.intervalId !== null) clearInterval(this.intervalId);
    });
  }

  private destroyRef = inject(DestroyRef);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  isRunning = signal(false);
  secondsRemaining = signal(25 * 60); // 1500 seconds = 25 minutes
  startLabel = computed(() => (this.isRunning() ? 'Pause' : 'Start'));

  formattedTime = computed(() => {
    const s = this.secondsRemaining();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  progressPercent = computed(() => {
    const total = 25 * 60;
    return Math.round(((total - this.secondsRemaining()) / total) * 100);
  });

  start(): void {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.secondsRemaining.update((s) => s - 1);
    }, 1000);
  }

  pause(): void {
    this.isRunning.set(false);
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.pause();
    this.secondsRemaining.set(25 * 60);
  }

  toggleTimer(): void {
    if (this.isRunning()) {
      this.pause();
    } else {
      this.start();
    }
  }
}
