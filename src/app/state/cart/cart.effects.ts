import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartState } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addItem,
          CartActions.removeItem,
          CartActions.updateQuantity,
          CartActions.clearCart
        ),

        tap(() => {
          // 👉 on lit le store uniquement au moment où l’effet s’exécute
          this.store.select(selectCartState).subscribe(cart => {
            if (!cart) return;

            try {
              localStorage.setItem('cart_v1', JSON.stringify(cart));
            } catch {}
          });
        })
      ),
    { dispatch: false }
  );
}
