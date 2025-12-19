import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.model';

export const selectCheckoutState =
  createFeatureSelector<CheckoutState>('checkout');

export const selectCheckoutAddress = createSelector(
  selectCheckoutState,
  state => state.address
);

export const selectPaymentMethod = createSelector(
  selectCheckoutState,
  state => state.paymentMethod
);

export const selectCheckoutLoading = createSelector(
  selectCheckoutState,
  state => state.loading
);

export const selectCheckoutError = createSelector(
  selectCheckoutState,
  state => state.error
);

export const selectOrderNumber = createSelector(
  selectCheckoutState,
  state => state.orderNumber
);
