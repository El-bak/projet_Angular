import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// NgRx Store
import { provideStore } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';

// NgRx Effects
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';

import { productsReducer } from './state/products/products.reducer';
import { ProductsEffects } from './state/products/products.effects';

import { ratingReducer } from './state/rating/rating.reducer';
import { RatingEffects } from './state/rating/rating.effects';

import { cartReducer } from './state/cart/cart.reducer';
import { CartEffects } from './state/cart/cart.effects';




export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // HTTP Client
    importProvidersFrom(HttpClientModule),

    // NgRx Store
    provideStore({
      auth: authReducer,
      products: productsReducer, 
      rating: ratingReducer,
      cart: cartReducer,
    }),

    // NgRx Effects
    provideEffects([AuthEffects, ProductsEffects, RatingEffects, CartEffects  ]),

  ],
};
