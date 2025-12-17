import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartState } from './cart.selectors';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private router = inject(Router);

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

  validateStock$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.validateStock),
    withLatestFrom(this.store.select(selectCartState)),
    switchMap(([_, cart]) =>
      fetch('/api/cart/validate-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      })
        .then(async res => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
          }
          return CartActions.validateStockSuccess();
        })
        .catch(err =>
          CartActions.validateStockFailure({ error: err.message })
        )
    )
  )
 );

 navigateAfterValidation$ = createEffect(
   () =>
     this.actions$.pipe(
       ofType(CartActions.validateStockSuccess),
       tap(() => {
         this.router.navigate(['/app/shop/checkout/summary']);
       })
     ),
   { dispatch: false }
 );
}
