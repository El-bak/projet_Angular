import { createAction, props } from '@ngrx/store';

export const applyCoupon = createAction(
  '[Cart] Apply Coupon',
  props<{ code: string }>()
);

export const clearCoupon = createAction('[Cart] Clear Coupon');
