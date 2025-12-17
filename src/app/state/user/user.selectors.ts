// src/app/state/user/user.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.model';

export const selectUserState =
  createFeatureSelector<UserState>('user');

export const selectUserProfile = createSelector(
  selectUserState,
  state => state.profile
);

export const selectUserOrders = createSelector(
  selectUserState,
  state => state.orders
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);

export const selectSelectedOrder = createSelector(
  selectUserState,
  state => state.selectedOrder
);
