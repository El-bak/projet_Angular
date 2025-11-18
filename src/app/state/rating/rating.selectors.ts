import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RatingState } from './rating.reducer';

// --- Sélecteur principal ---
export const selectRatingState = createFeatureSelector<RatingState>('rating');

// --- Average rating ---
export const selectRatingAverage = createSelector(
  selectRatingState,
  (state) => state.average
);

// --- Votes ---
export const selectRatingVotes = createSelector(
  selectRatingState,
  (state) => state.votes
);

// --- Loading ---
export const selectRatingLoading = createSelector(
  selectRatingState,
  (state) => state.loading
);

// --- Error ---
export const selectRatingError = createSelector(
  selectRatingState,
  (state) => state.error
);

// --- Response (résultat après un rating envoyé) ---
export const selectRatingResponse = createSelector(
  selectRatingState,
  (state) => state.response
);
