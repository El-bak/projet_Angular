
// src/app/state/user/user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.model';

export const initialState: UserState = {
  profile: null,
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUserProfile, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.loadUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false
  })),

  on(UserActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.loadUserOrders, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false
  })),

  on(UserActions.loadUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.updateUserProfile, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.updateUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false
  })),

  on(UserActions.updateUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.loadOrderDetail, state => ({
    ...state,
    loading: true,
    selectedOrder: null
  })),

  on(UserActions.loadOrderDetailSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    loading: false
  })),

  on(UserActions.loadOrderDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);