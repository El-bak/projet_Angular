// src/app/state/promo/promo.effects.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, withLatestFrom, map, catchError, of } from 'rxjs';

import * as PromoActions from './promo.actions';
import { selectCartItems } from '../cart/cart.selectors';
import * as CartActions from '../cart/cart.actions';
import { selectPromoCode } from './promo.selectors';
import { selectPromoState } from './promo.selectors';

@Injectable()
export class PromoEffects {

  private actions$ = inject(Actions);
  private store = inject(Store);
  private http = inject(HttpClient);

  applyPromo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PromoActions.applyPromo),
      withLatestFrom(this.store.select(selectCartItems)),
      switchMap(([{ code }, items]) =>
        this.http.post<any>('/api/cart/apply-promo', {
          items,
          code
        }).pipe(
          map(totals =>
            PromoActions.applyPromoSuccess({ totals })
          ),
          catchError(err =>
            of(
              PromoActions.applyPromoFailure({
                error: err.error?.message ?? 'Code promo invalide'
              })
            )
          )
        )
      )
    )
  );

  reapplyPromoOnCartChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartActions.updateQuantity,
        CartActions.removeItem,
        CartActions.addItem
      ),
      withLatestFrom(this.store.select(selectPromoCode)),
      switchMap(([_, code]) => {
        if (!code) {
          return of({ type: '[Promo] No promo to reapply' });
        }
        return of(PromoActions.applyPromo({ code }));
     })
   )
  );

  persistPromo$ = createEffect(
   () =>
     this.actions$.pipe(
       ofType(
         PromoActions.applyPromoSuccess,
         PromoActions.clearPromo
       ),
       withLatestFrom(this.store.select(selectPromoState)),
       map(([_, promo]) => {
         if (promo.code) {
           localStorage.setItem('promo_v1', JSON.stringify(promo));
         } else {
           localStorage.removeItem('promo_v1');
         }
       })
    ),
   { dispatch: false }
  );
}

