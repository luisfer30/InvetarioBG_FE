import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Products } from './pages/products/products';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'products',
    component: Products
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];