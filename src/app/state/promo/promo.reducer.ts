import { createReducer, on } from '@ngrx/store';
import * as PromoActions from './promo.actions';

export interface PromoTotals {
  itemsTotal: number;
  discount: number;
  shipping: number;
  taxes: number;
  grandTotal: number;
  appliedPromos: string[];
}

export interface PromoState {
  code: string | null;
  loading: boolean;
  error: string | null;
  totals: PromoTotals | null;
}

const initialState: PromoState = {
  code: null,
  loading: false,
  error: null,
  totals: null
};

export const promoReducer = createReducer(
  initialState,

  on(PromoActions.applyPromo, (state, { code }) => ({
    ...state,
    code,
    loading: true,
    error: null
  })),

  on(PromoActions.applyPromoSuccess, (state, { totals }) => ({
    ...state,
    loading: false,
    totals
  })),

  on(PromoActions.applyPromoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    totals: null,
    code: null
  })),

  on(PromoActions.clearPromo, () => initialState),

  on(PromoActions.loadPromoFromStorage, (_, { state }) => state),

);

