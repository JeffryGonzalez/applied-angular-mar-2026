import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { ListPage } from './internal/pages/list';
import { booksStore } from './data/books-store';

export const booksFeatureRoutes: Routes = [
  {
    path: '',
    providers: [booksStore],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'list',
        component: ListPage,
      },
    ],
  },
];
