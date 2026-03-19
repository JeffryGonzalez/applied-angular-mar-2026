import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { ListPage } from './internal/pages/list';
import { StatsPage } from './internal/pages/stats';
import { PrefsPage } from './internal/pages/prefs';
import { DetailsPage } from './internal/pages/details';

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
