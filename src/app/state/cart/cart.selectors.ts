import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCartState, (s) => s.items);
export const selectCartCount = createSelector(selectCartState, (s) => s.count);
export const selectCartTotal = createSelector(selectCartState, (s) => s.totalPrice);
export const selectStockError = createSelector(
  selectCartState,
  (s) => s.stockError
);