import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import * as CartActions from '../../state/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from './cart-item.component';
import { CartItem } from '../../state/cart/cart.reducer';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent,],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  items$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private store: Store) {  
  this.items$ = this.store.select(selectCartItems);
  this.total$ = this.store.select(selectCartTotal);

  }

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  updateQuantity(productId: number, qty: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity: qty }));
  }
}
