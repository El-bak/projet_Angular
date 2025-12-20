import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { AdminState } from './admin.model';

export const adminFeatureKey = 'admin';

export const initialState: AdminState = {
  stats: null,
  loading: false,
  error: null
};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.loadAdminStats, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AdminActions.loadAdminStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
    loading: false
  })),

  on(AdminActions.loadAdminStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
