import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartState } from './cart.selectors';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as PromoActions from '../promo/promo.actions';


@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private router = inject(Router);
  private http = inject(HttpClient);


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
      this.http.post<{ ok: boolean }>(
        '/api/cart/validate-stock',
        {
          items: cart.items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }
      ).pipe(
        map(() => CartActions.validateStockSuccess()),
        catchError(err =>
          of(
            CartActions.validateStockFailure({
              error: err.error?.message ?? 'Stock insuffisant',
            })
          )
        )
      )
    )
  )
)

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

 syncCartAfterPromo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PromoActions.applyPromoSuccess),
    map(({ totals }) =>
      CartActions.setTotals({
        subtotal: totals.itemsTotal,
        discount: totals.discount,
        totalPrice: totals.grandTotal
      })
    )
  )
);

}
