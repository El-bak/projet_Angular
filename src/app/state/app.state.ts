import { AuthState } from './auth/auth.reducer';
import { ProductsState } from './products/products.reducer';
import { RatingState } from './rating/rating.reducer';

export interface AppState {
  auth: AuthState;
  products: ProductsState;
  rating: RatingState;
}
