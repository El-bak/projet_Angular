import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Review } from './reviews.model';
import * as ReviewsActions from './reviews.actions';

@Injectable()
export class ReviewsEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.loadReviews),
      switchMap(({ productId }) =>
        this.http
          .get<Review[]>(`/api/products/${productId}/reviews/`)
          .pipe(
            map(reviews =>
              ReviewsActions.loadReviewsSuccess({ productId, reviews })
            ),
            catchError(error =>
              of(ReviewsActions.loadReviewsFailure({ error }))
            )
          )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewsActions.addReview),
      switchMap(({ productId, rating, comment }) =>
        this.http
          .post<Review>(`/api/products/${productId}/reviews/`, {
            rating,
            comment,
          })
          .pipe(
            map(review =>
              ReviewsActions.addReviewSuccess({ productId, review })
            ),
            catchError(error =>
              of(ReviewsActions.addReviewFailure({ error }))
            )
          )
      )
    )
  );
}
