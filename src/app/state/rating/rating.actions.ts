import { createAction, props } from '@ngrx/store';

// Charger le rating
export const loadRating = createAction(
  '[Rating] Load Rating',
  props<{ productId: number }>()
);

export const loadRatingSuccess = createAction(
  '[Rating] Load Rating Success',
  props<{ average: number; votes: number }>()   // <-- FIX : votes = number
);

export const loadRatingFailure = createAction(
  '[Rating] Load Rating Failure',
  props<{ error: string }>()
);

// Envoyer un rating
export const submitRating = createAction(
  '[Rating] Submit Rating',
  props<{ productId: number; rating: number }>()
);

export const submitRatingSuccess = createAction(
  '[Rating] Submit Rating Success',
  props<{ average: number; votes: number }>()   // <-- FIX : votes = number
);

export const submitRatingFailure = createAction(
  '[Rating] Submit Rating Failure',
  props<{ error: string }>()
);
