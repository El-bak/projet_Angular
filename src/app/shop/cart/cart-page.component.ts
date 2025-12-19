import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import * as CartActions from '../../state/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from './cart-item.component';
import { CartItem } from '../../state/cart/cart.reducer';
import { FormsModule } from '@angular/forms';
import { applyPromo  } from '../../state/promo/promo.actions';
import { selectPromoTotals} from '../../state/promo/promo.selectors';
import { selectStockError } from '../../state/cart/cart.selectors';
import { map } from 'rxjs/operators';
import { selectPromoState, selectPromoError } from '../../state/promo/promo.selectors';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  promoTotals$!: Observable<any>;
  promoError$!: Observable<string | null>;
  canCheckout$!: Observable<boolean>;
  stockError$!: Observable<string | null>;

  couponCode = '';

  constructor(private store: Store) {  
    
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
    this.stockError$ = this.store.select(selectStockError)
    this.promoTotals$ = this.store.select(selectPromoTotals);
    this.promoError$ = this.store.select(selectPromoError);
  
    this.canCheckout$ = this.store.select(selectPromoState).pipe(
      map(promo => !promo.loading && !promo.error)
    );
  }
  
  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  updateQuantity(productId: number, qty: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity: qty }));
  }

  applyPromo() {
      this.store.dispatch(applyPromo({ code: this.couponCode }));
  }

 checkout() {
   this.store.dispatch(CartActions.validateStock());
  }
}
