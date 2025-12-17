import { createSelector } from '@ngrx/store';
import { ReviewsState } from './reviews.model';

export const selectReviewsState = (state: any): ReviewsState => state.reviews;

export const selectReviewsLoading = createSelector(
  selectReviewsState,
  s => s.loading
);

export const selectReviewsEntities = createSelector(
  selectReviewsState,
  s => s.entities
);

/* Rajouté le 16/12/2025 à 17:00 */
export const selectReviewsByProductId = (productId: number) =>
  createSelector(
    selectReviewsEntities,
    entities => entities[productId] || []
);

export const selectReviewsError = createSelector(
  selectReviewsState,
  state => state.error
);
