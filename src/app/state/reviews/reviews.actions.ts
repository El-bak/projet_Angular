import { createAction, props } from '@ngrx/store';
import { Review } from './reviews.model';

export const loadReviews = createAction(
  '[Reviews] Load Reviews',
  props<{ productId: number }>()
);

export const loadReviewsSuccess = createAction(
  '[Reviews] Load Reviews Success',
  props<{ productId: number; reviews: Review[] }>()
);

export const loadReviewsFailure = createAction(
  '[Reviews] Load Reviews Failure',
  props<{ error: string }>()
);

export const addReview = createAction(
  '[Reviews] Add Review',
  props<{ productId: number; rating: number; comment: string }>()
);

export const addReviewSuccess = createAction(
  '[Reviews] Add Review Success',
  props<{ productId: number; review: Review }>()
);

export const addReviewFailure = createAction(
  '[Reviews] Add Review Failure',
  props<{ error: string }>()
);
