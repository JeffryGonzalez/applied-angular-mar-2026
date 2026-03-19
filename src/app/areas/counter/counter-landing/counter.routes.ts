import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { CounterPage } from './internal/pages/counter';

export const counterFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: 'counter',
        component: CounterPage,
      },
    ],
  },
];


export const signalsdemosFeatureRoutes: Routes = [
  {
    path: '',
    providers: [counterStore],

    // scoped (available) to anything in this feature,
    // but not outside of this.
    // it does not remove (destroy ) when you leave.
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
