import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { pomodoroStore } from '../../store';

@Component({
  selector: 'ht-pomodoro-timer-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `
    <app-ui-page title="Rakib Timer">
      <div class="flex flex-col items-center gap-6 py-4">
        <div
          class="badge badge-lg"
          [class.badge-error]="rakibMode() === 'work'"
          [class.badge-info]="rakibMode() !== 'work'"
        >
          Rakib
          @if (rakibMode() === 'work') {
            Focus
          } @else if (rakibMode() === 'shortBreak') {
            Short Break
          } @else {
            Long Break
          }
        </div>

        <div
          class="radial-progress text-2xl font-mono font-bold transition-all"
          [class.text-error]="rakibMode() === 'work'"
          [class.text-info]="rakibMode() !== 'work'"
          [style.--value]="rakibProgressPercent()"
          [style.--size]="'12rem'"
          [style.--thickness]="'8px'"
          role="progressbar"
          [attr.aria-valuenow]="rakibProgressPercent()"
          data-testid="rakib-time-display"
        >
          {{ rakibFormattedTime() }}
        </div>

        <div class="flex gap-4">
          <button
            class="btn btn-primary w-24"
            [class.btn-warning]="rakibIsRunning()"
            (click)="rakibToggleTimer()"
          >
            {{ rakibStartLabel() }}
          </button>
          <button class="btn btn-ghost" (click)="rakibReset()">Reset</button>
        </div>

        <p class="text-sm text-base-content/50">
          @if (rakibMode() === 'work') {
            Rakib Focus: {{ store.rakibWorkMinutes() }} min
          } @else if (rakibMode() === 'shortBreak') {
            Rakib Short Break: {{ store.rakibBreakMinutes() }} min
          } @else {
            Rakib Long Break: {{ store.rakibLongBreakMinutes() }} min
          }
        </p>
        <p class="text-xs text-base-content/50">
          Cycle: {{ rakibCyclesCompleted() }} / 4
        </p>
      </div>
    </app-ui-page>

    <app-ui-page title="Pomodoro Timer">
      <div class="flex flex-col items-center gap-6 py-4">
        <!-- Mode badge -->
        <div
          class="badge badge-lg"
          [class.badge-error]="mode() === 'work'"
          [class.badge-info]="mode() === 'break'"
        >
          {{ mode() === 'work' ? 'Focus' : 'Break' }}
        </div>

        <!-- Circular progress with time display -->
        <div
          class="radial-progress text-2xl font-mono font-bold transition-all"
          [class.text-error]="mode() === 'work'"
          [class.text-info]="mode() === 'break'"
          [style.--value]="progressPercent()"
          [style.--size]="'12rem'"
          [style.--thickness]="'8px'"
          role="progressbar"
          [attr.aria-valuenow]="progressPercent()"
          data-testid="time-display"
        >
          {{ formattedTime() }}
        </div>

        <!-- Controls -->
        <div class="flex gap-4">
          <button
            class="btn btn-primary w-24"
            [class.btn-warning]="isRunning()"
            (click)="toggleTimer()"
          >
            {{ startLabel() }}
          </button>
          <button class="btn btn-ghost" (click)="reset()">Reset</button>
        </div>

        <!-- Session info -->
        <p class="text-sm text-base-content/50">
          @if (mode() === 'work') {
            Focus session: {{ store.workMinutes() }} min
          } @else {
            Break: {{ store.breakMinutes() }} min
          }
        </p>
      </div>
    </app-ui-page>
  `,
  styles: ``,
})
export class TimerPage {
  store = inject(pomodoroStore);
  private destroyRef = inject(DestroyRef);

  mode = signal<'work' | 'break'>('work');
  isRunning = signal(false);
  secondsRemaining = signal(this.store.workMinutes() * 60);

  rakibMode = signal<'work' | 'shortBreak' | 'longBreak'>('work');
  rakibCyclesCompleted = signal(0);
  rakibIsRunning = signal(false);
  rakibSecondsRemaining = signal(this.store.rakibWorkMinutes() * 60);

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private rakibIntervalId: ReturnType<typeof setInterval> | null = null;

  // Derived: total session length based on current mode + store prefs
  sessionDuration = computed(() =>
    this.mode() === 'work'
      ? this.store.workMinutes() * 60
      : this.store.breakMinutes() * 60,
  );

  rakibSessionDuration = computed(() => {
    if (this.rakibMode() === 'work') {
      return this.store.rakibWorkMinutes() * 60;
    }
    if (this.rakibMode() === 'shortBreak') {
      return this.store.rakibBreakMinutes() * 60;
    }
    return this.store.rakibLongBreakMinutes() * 60;
  });

  // Derived: MM:SS string for display
  formattedTime = computed(() => {
    const s = this.secondsRemaining();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  rakibFormattedTime = computed(() => {
    const s = this.rakibSecondsRemaining();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  // Derived: 0–100 percent elapsed (for the radial progress)
  progressPercent = computed(() => {
    const duration = this.sessionDuration();
    if (duration === 0) return 0;
    return Math.round(((duration - this.secondsRemaining()) / duration) * 100);
  });

  rakibProgressPercent = computed(() => {
    const duration = this.rakibSessionDuration();
    if (duration === 0) return 0;
    return Math.round(((duration - this.rakibSecondsRemaining()) / duration) * 100);
  });

  // Derived: button label changes based on running state
  startLabel = computed(() => (this.isRunning() ? 'Pause' : 'Start'));
  rakibStartLabel = computed(() => (this.rakibIsRunning() ? 'Pause' : 'Start'));

  constructor() {
    // Effect: when the timer reaches zero while running, flip mode and reset
    effect(() => {
      if (this.secondsRemaining() === 0 && this.isRunning()) {
        this.clearTimer();
        this.mode.update((m) => (m === 'work' ? 'break' : 'work'));
        this.secondsRemaining.set(this.sessionDuration());
        this.isRunning.set(false);
      }
    });

    // Rakib timer auto-cycle logic (work → shortBreak ×3 → longBreak → work)
    effect(() => {
      if (this.rakibSecondsRemaining() === 0 && this.rakibIsRunning()) {
        this.rakibPause();

        if (this.rakibMode() === 'work') {
          const nextCycle = this.rakibCyclesCompleted() + 1;
          this.rakibCyclesCompleted.set(nextCycle);
          if (nextCycle < 4) {
            this.rakibMode.set('shortBreak');
          } else {
            this.rakibMode.set('longBreak');
          }
        } else {
          // Break finished: return to work; after long break reset cycle counter
          const newCycles = this.rakibMode() === 'longBreak' ? 0 : this.rakibCyclesCompleted();
          this.rakibCyclesCompleted.set(newCycles);
          this.rakibMode.set('work');
        }

        this.rakibSecondsRemaining.set(this.rakibSessionDuration());
      }
    });

    // Always clean up the intervals when this component is destroyed
    this.destroyRef.onDestroy(() => {
      this.clearTimer();
      this.clearRakibTimer();
    });
  }

  toggleTimer(): void {
    if (this.isRunning()) {
      this.pause();
    } else {
      this.start();
    }
  }

  start(): void {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.secondsRemaining.update((s) => s - 1);
    }, 1000);
  }

  pause(): void {
    this.isRunning.set(false);
    this.clearTimer();
  }

  reset(): void {
    this.pause();
    this.secondsRemaining.set(this.sessionDuration());
  }

  rakibToggleTimer(): void {
    if (this.rakibIsRunning()) {
      this.rakibPause();
    } else {
      this.rakibStart();
    }
  }

  rakibStart(): void {
    this.rakibIsRunning.set(true);
    this.rakibIntervalId = setInterval(() => {
      this.rakibSecondsRemaining.update((s) => s - 1);
    }, 1000);
  }

  rakibPause(): void {
    this.rakibIsRunning.set(false);
    this.clearRakibTimer();
  }

  rakibReset(): void {
    this.rakibPause();
    this.rakibMode.set('work');
    this.rakibCyclesCompleted.set(0);
    this.rakibSecondsRemaining.set(this.rakibSessionDuration());
  }

  private clearTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private clearRakibTimer(): void {
    if (this.rakibIntervalId !== null) {
      clearInterval(this.rakibIntervalId);
      this.rakibIntervalId = null;
    }
  }
}
