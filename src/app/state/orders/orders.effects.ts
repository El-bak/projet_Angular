import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as OrdersActions from './orders.actions';
import { catchError, map, switchMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { withLatestFrom } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../cart/cart.selectors';
import { selectPaymentMethod } from '../checkout/checkout.selectors';
import * as CartActions from '../cart/cart.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { selectPromoTotals } from '../promo/promo.selectors';
import * as PromoActions from '../promo/promo.actions';



@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);
  private router = inject(Router);


  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() =>
        this.http.get<any[]>('/api/orders').pipe(
          map(orders => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(err =>
            of(OrdersActions.loadOrdersFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrderDetail),
      switchMap(({ id }) =>
        this.http.get<any>(`/api/orders/${id}`).pipe(
          map(order => OrdersActions.loadOrderDetailSuccess({ order })),
          catchError(err =>
            of(OrdersActions.loadOrderDetailFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      withLatestFrom(
        this.store.select(selectCartItems),
        this.store.select(selectCartTotal),
        this.store.select(selectPaymentMethod),
        this.store.select(selectPromoTotals)
     ),
     switchMap(([_, items, total, paymentMethod, promo]) =>
       this.http.post<any>('/api/order/', {
         items,
         total,
         paymentMethod,

         promo: promo
           ? {
               discount: promo.discount,
               shipping: promo.shipping,
               taxes: promo.taxes,
               appliedPromos: promo.appliedPromos

             }
           : null
       }).pipe(
         map(order =>
           OrdersActions.createOrderSuccess({ order })
         ),
         catchError(err =>
           of(
             OrdersActions.createOrderFailure({
               error: err?.error?.message ?? 'Erreur création commande'
             })
           )
         )
       )
     )
   )
  );

  clearAfterOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrderSuccess),
      switchMap(() => [
        CartActions.clearCart(),
        PromoActions.clearPromo()
      ])
   )
 );


  redirectAfterCreate$ = createEffect(
    () =>
     this.actions$.pipe(
       ofType(OrdersActions.createOrderSuccess),
       tap(({ order }) => {
         this.router.navigate(['/app/account/orders', order.id]);
       })
     ),
   { dispatch: false }
  );
}
