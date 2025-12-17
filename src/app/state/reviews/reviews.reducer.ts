import { createReducer, on } from '@ngrx/store';
import * as ReviewsActions from './reviews.actions';
import { ReviewsState } from './reviews.model';

export const initialState: ReviewsState = {
  entities: {},
  loading: false,
  error: null,
};


export const reviewsReducer = createReducer(
  initialState,

  on(ReviewsActions.loadReviews, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReviewsActions.loadReviewsSuccess, (state, { productId, reviews }) => ({
    ...state,
    loading: false,
    entities: {
      ...state.entities,
      [productId]: reviews,
    },
  })),

  on(ReviewsActions.loadReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReviewsActions.addReviewSuccess, (state, { productId, review }) => ({
    ...state,
    entities: {
      ...state.entities,
      [productId]: [
        review,
        ...(state.entities[productId] || []),
      ],
    },
  }))
);