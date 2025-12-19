import { createReducer, on } from '@ngrx/store';
import * as CheckoutActions from './checkout.actions';
import { CheckoutState } from './checkout.model';

export const initialState: CheckoutState = {
  address: null,
  paymentMethod: null,
  loading: false,
  error: null,
  orderNumber: null
};

export const checkoutReducer = createReducer(
  initialState,

  on(CheckoutActions.saveAddress, (state, { address }) => ({
    ...state,
    address
  })),

  on(CheckoutActions.selectPaymentMethod, (state, { method }) => ({
    ...state,
    paymentMethod: method
  })),

  on(CheckoutActions.confirmOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CheckoutActions.confirmOrderSuccess, (state, { orderNumber }) => ({
    ...state,
    loading: false,
    orderNumber
  })),

  on(CheckoutActions.confirmOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CheckoutActions.clearCheckout, () => initialState)
);

