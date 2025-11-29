import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { authGuard } from './state/auth/auth.guard';


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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/products-page/products-page.component').then(
        (m) => m.ProductsPageComponent
      ),
  },

  {
    path: 'app/shop/rating',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/product-rating-page/product-rating-page.component').then(
        (m) => m.ProductRatingPageComponent
      ),
  },
       // Vien d'etre rajouté
    {
    path: 'app/shop/cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shop/cart/cart-page.component').then(m => m.CartPageComponent)
  },

  {
    path: 'app/shop/product/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/product-detail-page/product-detail-page.component').then(m => m.ProductDetailsPageComponent)
  },

  {
    path: 'app/shop/checkout/summary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shop/checkout/step1-summary.component').then(m => m.Step1SummaryComponent)
  },
  {
    path: 'app/shop/checkout/address',
    loadComponent: () =>
      import('./shop/checkout/step2-address.component').then(m => m.Step2AddressComponent)
  },
  {
    path: 'app/shop/checkout/confirm',
    loadComponent: () =>
      import('./shop/checkout/step3-confirm.component').then(m => m.Step3ConfirmComponent)
  },
  

  { path: '**', redirectTo: '/app', pathMatch: 'full' },
];
