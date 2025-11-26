import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { products } from '../../../mocks/data'; // ajoute l'import si ce n'est pas fait
export class ProductsEffects {
  private actions$ = inject(Actions);
  private api = inject(AppService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(({ page = 1, pageSize = 10, minRating, ordering }) =>
        this.api.getProducts({ page, page_size: pageSize, min_rating: minRating, ordering }).pipe(
          map((res: any) =>
            ProductsActions.loadProductsSuccess({ count: res.count, results: res.results })
          ),
          catchError((err) =>
            of(ProductsActions.loadProductsFailure({ error: err?.message ?? 'Load products failed' }))
          )
        )
      )
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

