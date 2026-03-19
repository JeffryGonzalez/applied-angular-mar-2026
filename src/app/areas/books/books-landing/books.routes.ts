import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { ListPage } from './internal/pages/list/list';
import { StatsPage } from './internal/pages/stats/stats';
import { PrefsPage } from './internal/pages/prefs/prefs';
import { DetailsPage } from './internal/pages/details/details';

export const booksFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListPage,
      },
      {
        path: 'stats',
        component: StatsPage,
      },
      {
        path: 'prefs',
        component: PrefsPage,
      },
      {
        path: 'details/:id',
        component: DetailsPage,
      },
    ],
  },
];
