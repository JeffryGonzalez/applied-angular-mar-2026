import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { effect } from '@angular/core';

const storageKey = 'pomodoro-prefs';

export const pomodoroStore = signalStore(
  { providedIn: 'root' },
  withState({ workMinutes: 25, breakMinutes: 5 }),
  withMethods((store) => ({
    setWorkMinutes(minutes: number): void {
      patchState(store, { workMinutes: minutes });
    },
    setBreakMinutes(minutes: number): void {
      patchState(store, { breakMinutes: minutes });
    },
  })),
  withHooks({
    onInit(store) {
      // Load saved prefs on startup
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        patchState(store, JSON.parse(saved));
      }

      // Save to localStorage whenever state changes
      effect(() => {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            workMinutes: store.workMinutes(),
            breakMinutes: store.breakMinutes(),
          }),
        );
      });
    },
  }),
);
