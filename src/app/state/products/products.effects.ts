import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { products } from '../../../mocks/data'; 
import { withLatestFrom, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductsState } from './products.selectors';

export class ProductsEffects {
  private actions$ = inject(Actions);
  private api = inject(AppService);
  private store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      withLatestFrom(this.store.select(selectProductsState)),
      switchMap(([action, state]) => {

        const currentQuery = {
          page: action.page ?? 1,
          pageSize: action.pageSize ?? 10,
          minRating: action.minRating,
          ordering: action.ordering
        };

        const sameQuery =
          state.lastQuery &&
          JSON.stringify(state.lastQuery) === JSON.stringify(currentQuery);

        // 👉 cache OK → on refetch en arrière-plan
        return this.api.getProducts({
          page: currentQuery.page,
          page_size: currentQuery.pageSize,
          min_rating: currentQuery.minRating,
          ordering: currentQuery.ordering
        }).pipe(
          map((res: any) =>
            ProductsActions.loadProductsSuccess({
              count: res.count,
              results: res.results
            })
          ),
          catchError(err =>
            of(
              ProductsActions.loadProductsFailure({
                error: err?.message ?? 'Load products failed'
              })
            )
          )
        );
      })
    )
  );

  /*vient tout juste d'etre rajouté*/


loadProductById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.loadProductById),
    mergeMap(({ id }) => {
      // Recherche dans les mocks
      const product = products.find(p => p.id === id);
      if (product) {
        return of(ProductsActions.loadProductByIdSuccess({ product }));
      } else {
        return of(ProductsActions.loadProductByIdFailure({ error: 'Produit non trouvé' }));
      }
    })
  )
);
}

