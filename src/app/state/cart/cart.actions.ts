import { createAction, props } from '@ngrx/store';
import { Product } from '../../../mocks/data';


export const addItem = createAction(
  '[Cart] Add Item',
  props<{ product: Product; quantity?: number }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const validateStock = createAction(
  '[Cart] Validate Stock'
);

export const validateStockSuccess = createAction(
  '[Cart] Validate Stock Success'
);

export const validateStockFailure = createAction(
  '[Cart] Validate Stock Failure',
  props<{ error: string }>()
);

export const clearCart = createAction('[Cart] Clear');

export const loadCartFromStorage = createAction('[Cart] Load From Storage', props<{ state: any }>());
