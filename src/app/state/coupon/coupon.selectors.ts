import { createSelector } from '@ngrx/store';
import { selectCartTotal } from '../cart/cart.selectors';

export const selectCoupon = (state: any) => state.coupon;

export const selectDiscount = createSelector(
  selectCoupon,
  coupon => coupon.discount
);

export const selectTotalAfterDiscount = createSelector(
  selectCartTotal,
  selectDiscount,
  (total, discount) => total - total * discount
);
