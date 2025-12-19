export interface PromoTotals {
  itemsTotal: number;
  discount: number;
  shipping: number;
  taxes: number;
  grandTotal: number;
  appliedPromos: string[];
}

export interface PromoState {
  loading: boolean;
  error: string | null;
  totals: PromoTotals | null;
}
