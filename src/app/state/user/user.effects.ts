import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, of } from 'rxjs';

import * as UserActions from './user.actions';
import { UserProfile, OrderSummary } from './user.model';
import { OrderDetail } from './user.model';


@Injectable()
export class UserEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  // ─────────────────────────────
  // LOAD PROFILE
  // ─────────────────────────────
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserProfile),
      switchMap(() =>
        this.http.get<UserProfile>('/api/me/').pipe(
          map(profile =>
            UserActions.loadUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(UserActions.loadUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  // ─────────────────────────────
  // UPDATE PROFILE
  // ─────────────────────────────
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      switchMap(({ changes }) =>
        this.http.patch<UserProfile>('/api/me/', changes).pipe(
          map(profile =>
            UserActions.updateUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(UserActions.updateUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  // ─────────────────────────────
  // LOAD ORDERS
  // ─────────────────────────────
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserOrders),
      switchMap(() =>
        this.http.get<OrderSummary[]>('/api/me/orders/').pipe(
          map(orders =>
            UserActions.loadUserOrdersSuccess({ orders })
          ),
          catchError(error =>
            of(UserActions.loadUserOrdersFailure({ error }))
          )
        )
      )
    )
  );

  loadOrderDetail$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.loadOrderDetail),
    switchMap(({ id }) =>
      this.http.get<OrderDetail>(`/api/orders/${id}/`).pipe( //modifié à 15/12/2025 à 22:20 OrderSummary to OrderDetail
        map(order =>
          UserActions.loadOrderDetailSuccess({ order })
        ),
        catchError(error =>
          of(UserActions.loadOrderDetailFailure({ error }))
        )
      )
    )
  )
 );

}
