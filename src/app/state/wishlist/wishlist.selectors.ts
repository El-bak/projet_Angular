import { createSelector } from '@ngrx/store';

export const selectWishlist = (state: any) => state.wishlist;

export const selectWishlistItems = createSelector(
  selectWishlist,
  s => s.items
);

export const isProductInWishlist = (id: number) =>
  createSelector(
    selectWishlistItems,
    items => items.includes(id)
  );

export const selectWishlistCount = createSelector(
  selectWishlistItems,
  items => items.length
);
