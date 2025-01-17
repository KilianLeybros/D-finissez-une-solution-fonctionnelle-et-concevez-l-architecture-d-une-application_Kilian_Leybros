import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'requests',
    loadComponent: async () =>
      (await import('./views/request/request.component')).RequestComponent,
    loadChildren: async () =>
      (await import('./shared/routes/requests.routes')).routes,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
