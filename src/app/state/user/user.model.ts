// src/app/state/user/user.model.ts

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface OrderSummary {
  id: string;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  createdAt: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
}


export interface UserPreferences {
  newsletter: boolean;
  defaultMinRating?: number;
}

export interface UserState {
  profile: UserProfile | null;
  orders: OrderSummary[];
  selectedOrder: OrderDetail | null;
  loading: boolean;
  error: string | null;
}


export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  defaultAddress?: Address;
  preferences: UserPreferences;
}
