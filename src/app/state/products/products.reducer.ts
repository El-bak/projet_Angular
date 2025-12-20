import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  count: number;
  results: any[];
  loading: boolean;
  error: string | null;
  selectedProduct: any | null;   //  AJOUT ICI
  lastQuery: { page?: number; pageSize?: number; minRating?: number; ordering?: string } | null;
}

export const initialState: ProductsState = {
  count: 0,
  results: [],
  loading: false,
  error: null,
  selectedProduct: null, // Ajout ici
  lastQuery: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, { page, pageSize, minRating, ordering }) => ({
    ...state,
    loading: true,
    error: null,
    lastQuery: { page, pageSize, minRating, ordering },
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
  })),

  on(ProductsActions.loadProductById, (state) => ({
     ...state,
    loading: true,
    error: null,
    selectedProduct: null
  })),
  

  on(ProductsActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    selectedProduct: product
  })),

  on(ProductsActions.loadProductByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

