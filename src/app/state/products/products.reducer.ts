import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  count: number;
  results: any[];
  loading: boolean;
  error: string | null;
  lastQuery: { page?: number; pageSize?: number; minRating?: number; ordering?: string } | null;
}

export const initialState: ProductsState = {
  count: 0,
  results: [],
  loading: false,
  error: null,
  lastQuery: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, query) => ({
    ...state,
    loading: true,
    error: null,
    lastQuery: query,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { count, results }) => ({
    ...state,
    count,
    results,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
