import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { ListPage } from './internal/pages/list';
import { AddPage } from './internal/pages/add';
import { Add2Page } from './internal/pages/add2';
import { DetailsPage } from './internal/pages/details';
import { UserLinksApi } from './data/user-links-api';
import { userLinksStore } from './data/user-links-store';

export const resourcesFeatureRoutes: Routes = [
  {
    path: '',
    providers: [UserLinksApi, userLinksStore],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'list/:id',
        component: DetailsPage,
      },
      {
        path: 'list',
        component: ListPage,
      },
      {
        path: 'add',
        component: AddPage,
      },
      {
        path: 'add-2',
        component: Add2Page,
      },
    ],
  },
];
