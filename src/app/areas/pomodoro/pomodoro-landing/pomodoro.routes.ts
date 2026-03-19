import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { TimerPage } from './internal/pages/timer';
export const pomodoroFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'timer',
        title: 'Timer',
        component: TimerPage,
      },
      {
        path: 'prefs',
        title: 'Settings',
      },
    ],
  },
];
