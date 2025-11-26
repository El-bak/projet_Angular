// src/app/shop/checkout/step1-summary.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart/cart-item.component';
import { CartItem } from '../../state/cart/cart.reducer';
import * as CartActions from '../../state/cart/cart.actions';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent],
  templateUrl: './step1-summary.component.html',
  styleUrls: ['./step1-summary.component.css']
})
export class Step1SummaryComponent {
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
