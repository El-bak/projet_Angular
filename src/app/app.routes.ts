import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },

  {
    path: 'app/login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'app/shop/products',
    loadComponent: () =>
      import('./pages/products-page/products-page.component').then(
        (m) => m.ProductsPageComponent
      ),
  },

  {
    path: 'app/shop/rating',
    loadComponent: () =>
      import('./pages/product-rating-page/product-rating-page.component').then(
        (m) => m.ProductRatingPageComponent
      ),
  },

  { path: '**', redirectTo: '' },
];
