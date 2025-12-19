import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromoState } from './promo.reducer';

export const selectPromoState =
  createFeatureSelector<PromoState>('promo');

export const selectPromoCode = createSelector(
  selectPromoState,
  s => s.code
);

export const selectPromoTotals = createSelector(
  selectPromoState,
  s => s.totals
);

export const selectPromoError = createSelector(
  selectPromoState,
  s => s.error
);

export const selectGrandTotal = createSelector(
  selectPromoTotals,
  totals => totals?.grandTotal ?? null
);
