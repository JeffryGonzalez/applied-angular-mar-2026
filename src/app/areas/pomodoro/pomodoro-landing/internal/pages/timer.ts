import { Component, signal, computed, inject, DestroyRef, effect } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { pomodoroStore } from './../../store';

@Component({
  selector: 'app--pages-',
  imports: [PageLayout],
  template: `<app-ui-page title="Pomodoro Timer">
    <div class="flex flex-col items-center gap-6 py-4">
      <!-- Mode badge -->
      <div
        class="badge badge-lg"
        [class.badge-error]="mode() === 'work'"
        [class.badge-info]="mode() === 'break'"
      >
        {{ mode() === 'work' ? 'Focus' : 'Break' }}
      </div>

      <!-- Timer display -->
      <div
        class="radial-progress text-2xl font-mono font-bold"
        [class.text-error]="mode() === 'work'"
        [class.text-info]="mode() === 'break'"
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
    effect(() => {
      if (this.secondsRemaining() === 0 && this.isRunning()) {
        this.pause();
        this.mode.update((m) => (m === 'work' ? 'break' : 'work'));
        this.secondsRemaining.set(this.sessionDuration());
      }
    });

    // DestroyRef cleanup from Sprint 3 stays here too
    this.destroyRef.onDestroy(() => {
      if (this.intervalId !== null) clearInterval(this.intervalId);
    });
  }

  store = inject(pomodoroStore);
  private destroyRef = inject(DestroyRef);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  isRunning = signal(false);
  mode = signal<'work' | 'break'>('work');
  secondsRemaining = signal(this.store.workMinutes() * 60);
  sessionDuration = computed(() =>
    this.mode() === 'work' ? this.store.workMinutes() * 60 : this.store.breakMinutes() * 60,
  );
  //sessionDuration = computed(() => (this.mode() === 'work' ? 5 : 5 * 60));
  startLabel = computed(() => (this.isRunning() ? 'Pause' : 'Start'));

  formattedTime = computed(() => {
    const s = this.secondsRemaining();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  progressPercent = computed(() => {
    const total = this.sessionDuration();
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
    this.secondsRemaining.set(this.sessionDuration());
  }

  toggleTimer(): void {
    if (this.isRunning()) {
      this.pause();
    } else {
      this.start();
    }
  }
}
