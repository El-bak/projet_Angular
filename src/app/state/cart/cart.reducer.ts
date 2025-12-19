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
  subtotal: number;
  discount: number;
  totalPrice: number;
  count: number;
  stockError: string | null;
}

const saved = (() => {
  try {
    const raw = localStorage.getItem('cart_v1');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

export const initialState: CartState = saved ?? { 
  items: [], 
  totalPrice: 0, 
  count: 0,
  stockError: null,
};

const compute = (state: CartState, items: CartItem[]): CartState => {
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return {
    ...state,
    items,
    count,
    totalPrice,
  };
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product, quantity = 1 }) => {
    const idx = state.items.findIndex(it => it.productId === product.id);
    let items: CartItem[];

    if (idx >= 0) {
      items = state.items.map(it =>
        it.productId === product.id
          ? { ...it, quantity: it.quantity + quantity }
          : it
     );
   }  else {
     items = [
       ...state.items,
       {
         productId: product.id,
         name: product.name,
         price: product.price,
         quantity,
         image: product.image,
       },
     ];
   }

   return compute(state, items);
  }),

  on(CartActions.removeItem, (state, { productId }) => {
    const items = state.items.filter(i => i.productId !== productId);
    return compute(state, items);
  }),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const items = state.items
      .map(i => i.productId === productId ? { ...i, quantity } : i)
      .filter(i => i.quantity > 0);

    return compute(state, items);
  }),

  on(CartActions.setTotals, (state, { subtotal, discount, totalPrice }) => ({
    ...state,
    subtotal,
    discount,
    totalPrice
  })),

  on(CartActions.clearCart, (state) => compute(state, [])),
  on(CartActions.loadCartFromStorage, (_, { state }) => state),
  on(CartActions.validateStock, (state) => ({
    ...state,
    stockError: null,
  })),

  on(CartActions.validateStockFailure, (state, { error }) => ({
    ...state,
    stockError: error,
  })),

  on(CartActions.validateStockSuccess, (state) => ({
    ...state,
    stockError: null,
  })),
);
