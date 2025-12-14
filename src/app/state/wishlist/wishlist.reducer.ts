import { createReducer, on } from '@ngrx/store';
import * as WishlistActions from './wishlist.actions';

export interface WishlistState {
  items: number[];
}

const storedWishlist = localStorage.getItem('wishlist');
export const initialState: WishlistState = {
  items: storedWishlist ? JSON.parse(storedWishlist) :  [],
};

export const wishlistReducer = createReducer(
  initialState,

  on(WishlistActions.toggleWishlist, (state, { productId }) => ({
    ...state,
    items: state.items.includes(productId)
      ? state.items.filter(id => id !== productId)
      : [...state.items, productId]
  }))
);

export function wishlistMetaReducer(reducer: any) {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    localStorage.setItem('wishlist', JSON.stringify(nextState.items));
    return nextState;
  };
}

