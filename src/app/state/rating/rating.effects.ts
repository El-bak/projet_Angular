import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RatingActions from './rating.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()   // <<=== OBLIGATOIRE
export class RatingEffects {
  private actions$ = inject(Actions);
  private api = inject(AppService);

  // --- GET rating d’un produit ---
  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.loadRating),
      mergeMap(({ productId }) =>
        this.api.getProductRating(productId).pipe(
          map((res) =>
            RatingActions.loadRatingSuccess({
              average: res.avg_rating,   // données MSW
              votes: res.count
            })
          ),
          catchError((err) =>
            of(
              RatingActions.loadRatingFailure({
                error: err?.message ?? 'Failed to load rating',
              })
            )
          )
        )
      )
    )
  );

  // --- POST rating ---
  submitRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.submitRating),
      mergeMap(({ productId, rating }) =>
        this.api.rateProduct(productId, rating).pipe(
          map((res) =>
            RatingActions.submitRatingSuccess({
              average: res.avg_rating,
              votes: res.count
            })
          ),
          catchError((err) =>
            of(
              RatingActions.submitRatingFailure({
                error: err?.message ?? 'Rating failed',
              })
            )
          )
        )
      )
    )
  );
}
