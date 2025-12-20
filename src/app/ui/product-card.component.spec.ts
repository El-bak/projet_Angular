import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.id = 1;
    component.name = 'Test Product';
    component.price = 10;
    component.image = 'img.png';
    component.isInWishlist = false;

    fixture.detectChanges();
  });

  it('should display product name', () => {
    expect(fixture.nativeElement.textContent).toContain('Test Product');
  });

  it('should emit add event when clicking add button', () => {
    spyOn(component.add, 'emit');

    const btn = fixture.debugElement.query(By.css('.add-btn'));
    btn.triggerEventHandler('click', {
      stopPropagation: () => {}
    });

    expect(component.add.emit).toHaveBeenCalled();
  });

  it('should emit add event when clicking add button', () => {
    spyOn(component.add, 'emit');

    const btn = fixture.debugElement.query(By.css('.add-btn'));
    btn.triggerEventHandler('click', {
      stopPropagation: () => {}
    });

    expect(component.add.emit).toHaveBeenCalled();
  });

});
