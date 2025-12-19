import { createAction, props } from '@ngrx/store';
import { PromoTotals } from './promo.model';

export const applyPromo = createAction(
  '[Checkout] Apply Promo',
  props<{ code: string }>()
);

export const applyPromoSuccess = createAction(
  '[Checkout] Apply Promo Success',
  props<{ totals: PromoTotals }>()
);

export const applyPromoFailure = createAction(
  '[Checkout] Apply Promo Failure',
  props<{ error: string }>()
);

export const loadPromoFromStorage = createAction(
  '[Promo] Load From Storage',
  props<{ state: any }>()
);


export const clearPromo = createAction('[Checkout] Clear Promo');