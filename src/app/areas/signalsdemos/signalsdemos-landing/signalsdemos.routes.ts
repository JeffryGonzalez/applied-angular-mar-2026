import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { CounterPage } from './internal/pages/counter';
import { PrefsPage } from './internal/pages/prefs';

export const signalsdemosFeatureRoutes: Routes = [
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
        path: 'counter',
        component: CounterPage,
      },
      {
        path: 'prefs',
        component: PrefsPage,
      },
    ],
  },
];
