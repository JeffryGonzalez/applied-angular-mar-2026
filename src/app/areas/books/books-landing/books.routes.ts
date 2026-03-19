import { Routes } from '@angular/router';
import { BookApi } from './books-api';
import { BooksStore } from './books-store';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { PrefsComponent } from './internal/pages/prefs.component';
import { ListComponent } from './internal/pages/list.component';
import { DetailsComponent } from './internal/pages/details.component';
import { StatsComponent } from './internal/pages/stats.component';

export const booksFeatureRoutes: Routes = [
  {
    path: '',
    providers: [BookApi, BooksStore],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
      {
        path: 'list/details/:id',
        component: DetailsComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
    ],
  },
];
