import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { authGuard } from './guards/auth.guard';
import { ProductForm } from './pages/product-form/product-form';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'products',
    component: Products,
    canActivate: [authGuard]
  },
  {
  path: 'products/edit/:id',
  component: ProductForm,
  canActivate: [authGuard]
  },
  {
    path: 'products/new',
    component: ProductForm,
    canActivate: [authGuard]
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