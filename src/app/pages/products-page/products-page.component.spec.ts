import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductsPageComponent } from './products-page.component';

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent],
      providers: [
        provideMockStore({
          initialState: {}
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
