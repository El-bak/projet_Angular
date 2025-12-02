import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
}

const saved = (() => {
  try {
    const raw = localStorage.getItem('cart_v1');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

export const initialState: CartState = saved ?? { items: [], totalPrice: 0, count: 0 };

const compute = (items: CartItem[]) => {
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { items, count, totalPrice };
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product, quantity = 1 }) => {
    const idx = state.items.findIndex((it) => it.productId === product.id);
    let items: CartItem[] = [];
    if (idx >= 0) {
      items = state.items.map((it) =>
        it.productId === product.id ? { ...it, quantity: it.quantity + quantity } : it
      );
    } else {
      items = [...state.items, { productId: product.id, name: product.name, price: product.price, quantity, image: product.image }];
    }
    return compute(items);
  }),
  on(CartActions.removeItem, (state, { productId }) => {
    const items = state.items.filter((i) => i.productId !== productId);
    return compute(items);
  }),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const items = state.items
      .map((i) => (i.productId === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    return compute(items);
  }),
  on(CartActions.clearCart, () => compute([])),
  on(CartActions.loadCartFromStorage, (_, { state }) => state)
);
