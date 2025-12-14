import { createReducer, on } from '@ngrx/store';
import * as CouponActions from './coupon.actions';

export interface CouponState {
  code: string | null;
  discount: number; // 0.10 = 10%
}

export const initialState: CouponState = {
  code: null,
  discount: 0,
};

const VALID_COUPONS: Record<string, number> = {
  'PROMO10': 0.10,
  'ESTIAM20': 0.20,
  'BLACKFRIDAY': 0.30
};

export const couponReducer = createReducer(
  initialState,

  on(CouponActions.applyCoupon, (state, { code }) => ({
    code,
    discount: VALID_COUPONS[code.toUpperCase()] ?? 0
  })),

  on(CouponActions.clearCoupon, () => initialState)
);
