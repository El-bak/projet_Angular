import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, throwError } from 'rxjs';
import { ProductsEffects } from './products.effects';
import * as ProductsActions from './products.actions';
import { AppService } from '../../services/app.service';
import { Store } from '@ngrx/store';

describe('ProductsEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: ProductsEffects;
  let api: jasmine.SpyObj<AppService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    api = jasmine.createSpyObj('AppService', ['getProducts']);
    store = jasmine.createSpyObj('Store', ['select']);

    // ✅ TOUJOURS retourner un ProductsState COMPLET
    store.select.and.returnValue(
      of({
        count: 0,
        results: [],
        loading: false,
        error: null,
        selectedProduct: null,
        lastQuery: null
      })
    );

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: AppService, useValue: api },
        { provide: Store, useValue: store },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
  });

  it('should dispatch loadProductsSuccess', (done) => {
    api.getProducts.and.returnValue(
      of({ count: 1, results: [{ id: 1, name: 'Product' }] })
    );

    actions$ = new ReplaySubject(1);
    actions$.next(ProductsActions.loadProducts({}));

    effects.loadProducts$.subscribe(result => {
      expect(result).toEqual(
        ProductsActions.loadProductsSuccess({
          count: 1,
          results: [{ id: 1, name: 'Product' }],
        })
      );
      done();
    });
  });

  it('should dispatch loadProductsFailure on error', (done) => {
    api.getProducts.and.returnValue(
      throwError(() => new Error('fail'))
    );

    actions$ = new ReplaySubject(1);
    actions$.next(ProductsActions.loadProducts({}));

    effects.loadProducts$.subscribe(result => {
      expect(result.type).toBe('[Products] Load Products Failure');
      done();
    });
  });
});
