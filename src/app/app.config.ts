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
import { promoReducer } from './state/promo/promo.reducer';
import { PromoEffects } from './state/promo/promo.effects';
import { wishlistMetaReducer, wishlistReducer } from './state/wishlist/wishlist.reducer';
import { userReducer  } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { ReviewsEffects } from './state/reviews/reviews.effects';
import { reviewsReducer } from './state/reviews/reviews.reducer';
import { checkoutReducer } from './state/checkout/checkout.reducer';
import { CheckoutEffects } from './state/checkout/checkout.effects';
import { ordersReducer } from './state/orders/orders.reducer';
import { OrdersEffects } from './state/orders/orders.effects';


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
      promo: promoReducer,
      wishlist: wishlistMetaReducer(wishlistReducer),
      user: userReducer,
      reviews: reviewsReducer,
      checkout: checkoutReducer,
      orders: ordersReducer,
      

    }),

    // NgRx Effects
    provideEffects([AuthEffects, ProductsEffects, RatingEffects, CartEffects, UserEffects, ReviewsEffects, PromoEffects, CheckoutEffects, OrdersEffects]),

  ],
};
