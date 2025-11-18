import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductRatingPageComponent} from './product-rating-page.component';
import { ActivatedRoute } from '@angular/router';

describe('ProductRatingPageComponent', () => {
  let component: ProductRatingPageComponent;
  let fixture: ComponentFixture<ProductRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRatingPageComponent],
      providers: [provideMockStore({ initialState: {} }),

      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => '1' //Simule productId = 1
            }
          }
        }
       }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
