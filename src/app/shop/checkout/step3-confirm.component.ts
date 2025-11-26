// src/app/shop/checkout/step3-confirm.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { Observable } from 'rxjs';
import { CartItem } from '../../state/cart/cart.reducer';
import * as CartActions from '../../state/cart/cart.actions';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3-confirm.component.html',
  styleUrls: ['./step3-confirm.component.css']
})
export class Step3ConfirmComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  orderNumber: string | null = null;

  constructor(private store: Store, private router: Router) {
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
  }

  confirmOrder() {
    // Ici on simule la commande et on nettoie le panier
    this.orderNumber = 'ORD-' + Math.floor(Math.random() * 100000);
    this.store.dispatch(CartActions.clearCart());
  }

  backToHome() {
    this.router.navigate(['/app']);
  }
}
