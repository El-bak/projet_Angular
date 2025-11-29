import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPageComponent } from './product-detail-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductDetailPage', () => {
  let component: ProductDetailsPageComponent;
  let fixture: ComponentFixture<ProductDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsPageComponent, RouterTestingModule],
       providers: [
        // Simule un ID dans l'URL : /product/123
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123',  // ID simulé
              },
            },
          },
        },

        // Simule NgRx Store
        provideMockStore({
          initialState: {
            products: {
              selectedProduct: null,
              loading: false,
              error: null,
            },
            cart: {
              items: [],
            },
          },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
