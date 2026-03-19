import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const pomodoroStore = signalStore(
  { providedIn: 'root' },
  withState({
    workMinutes: 25,
    breakMinutes: 5,
  }),
  withMethods((store) => ({
    setWorkMinutes(minutes: number): void {
      patchState(store, { workMinutes: minutes });
    },
    setBreakMinutes(minutes: number): void {
      patchState(store, { breakMinutes: minutes });
    },
  })),
);
