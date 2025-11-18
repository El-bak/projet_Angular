import { createReducer, on } from '@ngrx/store';
import * as RatingActions from './rating.actions';

export interface RatingState {
  average: number | null;
  votes: number | null;        // <-- AVANT tableau, MAINTENANT number
  loading: boolean;
  error: string | null;
  response: any | null;
}

export const initialState: RatingState = {
  average: null,
  votes: null,                  // <-- AVANT [], maintenant null
  loading: false,
  error: null,
  response: null,
};

export const ratingReducer = createReducer(
  initialState,

  // ---- Load Rating ----
  on(RatingActions.loadRating, (state) => ({
    ...state,
    loading: true,
    error: null,
    response: null,
  })),

  on(RatingActions.loadRatingSuccess, (state, { average, votes }) => ({
    ...state,
    loading: false,
    average,
    votes,                       // <-- maintenant OK (votes = number)
    error: null,
  })),

  on(RatingActions.loadRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ---- Submit Rating ----
  on(RatingActions.submitRating, (state) => ({
    ...state,
    loading: true,
    error: null,
    response: null,
  })),

  on(RatingActions.submitRatingSuccess, (state, { average, votes }) => ({
    ...state,
    loading: false,
    average,
    votes,
    response: { average, votes },  // OK
  })),

  on(RatingActions.submitRatingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
