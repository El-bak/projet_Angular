import { createAction, props } from '@ngrx/store';

export const toggleWishlist = createAction(
  '[Wishlist] Toggle',
  props<{ productId: number }>()
);
