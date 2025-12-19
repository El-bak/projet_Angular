export interface Order {
  id: string;
  orderNumber: string;
  items: any[];
  total: number;
  paymentMethod: string;
  status: 'paid' | 'shipped' | 'delivered';
  createdAt: string;
  promo?: {
    discount: number;
    shipping: number;
    taxes: number;
    appliedPromos: string[];
  } | null;

}

export interface OrdersState {
  list: Order[];
  selected: Order | null;
  lastOrder: any | null;
  loading: boolean;
  error: string | null;
}
