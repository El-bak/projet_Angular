import { createAction, props } from '@ngrx/store';
import { Address } from './checkout.model';

export const saveAddress = createAction(
  '[Checkout] Save Address',
  props<{ address: Address }>()
);

export const selectPaymentMethod = createAction(
  '[Checkout] Select Payment Method',
  props<{ method: 'card' | 'paypal' }>()
);

export const clearCheckout = createAction('[Checkout] Clear');

export const confirmOrder = createAction('[Checkout] Confirm Order');

export const confirmOrderSuccess = createAction(
  '[Checkout] Confirm Order Success',
  props<{ orderNumber: string }>()
);

export const confirmOrderFailure = createAction(
  '[Checkout] Confirm Order Failure',
  props<{ error: string }>()
);

