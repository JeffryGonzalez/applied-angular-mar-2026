import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { BooksListPage } from './internal/pages/books/list/list';
import { BooksStatsPage } from './internal/pages/books/stats/stats';
import { BooksPrefsPage } from './internal/pages/books/prefs/prefs';
import { BooksDetailsPage } from './internal/pages/books/details/details';

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
        component: BooksListPage,
      },
      {
        path: 'stats',
        component: BooksStatsPage,
      },
      {
        path: 'prefs',
        component: BooksPrefsPage,
      },
      {
        path: 'details/:id',
        component: BooksDetailsPage,
      },
    ],
  },
];
