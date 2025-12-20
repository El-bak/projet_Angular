import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.model';
import { adminFeatureKey } from './admin.reducer';

export const selectAdminState =
  createFeatureSelector<AdminState>(adminFeatureKey);

export const selectAdminStats =
  createSelector(selectAdminState, (state) => state.stats);

export const selectAdminLoading =
  createSelector(selectAdminState, (state) => state.loading);

export const selectAdminError =
  createSelector(selectAdminState, (state) => state.error);
