import { NotFoundComponent } from './features/not-found/not-found.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { DetailsComponent } from './features/details/details.component';
import { ChekoutComponent } from './features/chekout/chekout.component';
import { guardGuard } from './core/guards/guard-guard';
import { isloggedGuard } from './core/guards/islogged-guard';
import { WashlistComponent } from './features/washlist/washlist/washlist.component';
import { AllordersComponent } from './features/allorders/allorders.component';
import { ForgotpasswordComponent } from './core/auth/forgotpassword/forgotpassword.component';
import { AllorderDetailsComponent } from './features/allorder-details/allorder-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'home page' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isloggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'login Page',
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'login Page',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgotpassword/forgotpassword.component').then(
            (c) => c.ForgotpasswordComponent
          ),
        title: 'forgot Page',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [guardGuard],

    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'home Page',
      },
      {
        path: 'washlist',
        loadComponent: () =>
          import('./features/washlist/washlist/washlist.component').then(
            (c) => c.WashlistComponent
          ),
        title: 'washlist Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'products Page',
      },
      {
        path: 'categorise',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'categorise Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'allorders Page',
      },
      {
        path: 'allorder-details/:id',
        loadComponent: () =>
          import('./features/allorder-details/allorder-details.component').then(
            (c) => c.AllorderDetailsComponent
          ),
        title: 'allorder-details Page',
      },

      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands Page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/chekout/chekout.component').then(
            (c) => c.ChekoutComponent
          ),
        title: 'Chekout Page',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
        title: 'nout-found page',
      },
    ],
  },
];
