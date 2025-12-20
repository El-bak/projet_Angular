import { createSelector } from '@ngrx/store';

export const selectWishlistState = (state: any) => state.wishlist;
export const selectProductsState = (state: any) => state.products;

export const selectWishlistItems = createSelector(
  selectWishlistState,
  (state) => state.items
);

export const selectWishlistCount = createSelector(
  selectWishlistItems,
  (items) => items.length
);

export const isProductInWishlist = (productId: number) =>
  createSelector(
    selectWishlistItems,
    (items) => items.includes(productId)
  );

export const selectWishlistProducts = createSelector(
  selectWishlistItems,
  selectProductsState,
  (wishlistItems, productsState) =>
    productsState.list.filter((product: any) =>
      wishlistItems.includes(product.id)
    )
);
