export interface ProductsQuery {
  page: number;
  pageSize: number;
  minRating?: number;
  ordering?: string;
}

export interface ProductsState {
  count: number;
  results: any[];
  loading: boolean;
  error: string | null;
  selectedProduct: any | null;
  lastQuery: ProductsQuery | null;
}
