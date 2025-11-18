import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (s) => s?.access
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (s) => s?.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (s) => s?.error
);
