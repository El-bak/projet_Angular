import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsList = createSelector(
  selectProductsState,
  (s) => s?.results ?? []
);

export const selectProductsCount = createSelector(
  selectProductsState,
  (s) => s?.count ?? 0
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (s) => s?.loading ?? false
);

export const selectProductsError = createSelector(
  selectProductsState,
  (s) => s?.error
);

export const selectProductsLastQuery = createSelector(
  selectProductsState,
  (s) => s?.lastQuery
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (s) => s?.selectedProduct ?? null
);

