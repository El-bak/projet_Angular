import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, switchMap, map, catchError, withLatestFrom } from 'rxjs';
import * as CheckoutActions from './checkout.actions';
import * as CartActions from '../cart/cart.actions';
import { selectCartItems } from '../cart/cart.selectors';
import { selectCheckoutAddress, selectPaymentMethod } from './checkout.selectors';

@Injectable()
export class CheckoutEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  confirmOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.confirmOrder),
      withLatestFrom(
        this.store.select(selectCartItems),
        this.store.select(selectCheckoutAddress),
        this.store.select(selectPaymentMethod)
      ),
      switchMap(([_, items, address, paymentMethod]) =>
        this.http.post('/api/cart/validate-stock', { items }).pipe(
          switchMap(() =>
            this.http.post<any>('/api/order/', {
              items,
              address,
              paymentMethod
            })
          ),
          map(res =>
            CheckoutActions.confirmOrderSuccess({
              orderNumber: res.orderNumber
            })
          ),
          catchError(err =>
            of(
              CheckoutActions.confirmOrderFailure({
                error: err.error?.message ?? 'Erreur lors de la commande'
              })
            )
          )
        )
      )
    )
  );

  clearCartOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.confirmOrderSuccess),
      map(() => CartActions.clearCart())
    )
  );
}
