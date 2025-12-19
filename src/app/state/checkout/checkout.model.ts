export interface Address {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutState {
  address: Address | null;
  paymentMethod: 'card' | 'paypal' | null;
  loading: boolean;
  error: string | null;
  orderNumber: string | null;
}

