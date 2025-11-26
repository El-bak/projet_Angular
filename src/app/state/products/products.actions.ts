import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ page?: number; pageSize?: number; minRating?: number; ordering?: string }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ count: number; results: any[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);
 /*vient tout juste d'etre rajouté*/
export const loadProductById = createAction(
  '[Products] Load Product By ID',
  props<{ id: number }>()
);

export const loadProductByIdSuccess = createAction(
  '[Products] Load Product By ID Success',
  props<{ product: any }>()
);

export const loadProductByIdFailure = createAction(
  '[Products] Load Product By ID Failure',
  props<{ error: string }>()
);
