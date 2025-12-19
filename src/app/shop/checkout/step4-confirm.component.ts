// src/app/shop/checkout/step4-confirm.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { Observable } from 'rxjs';
import { CartItem } from '../../state/cart/cart.reducer';
import * as CartActions from '../../state/cart/cart.actions';
import { RouterLink } from '@angular/router';
import { selectPaymentMethod } from '../../state/checkout/checkout.selectors';
import * as OrdersActions from '../../state/orders/orders.actions';
import {
  selectLastOrderNumber,
  selectOrdersLoading,
  selectOrdersError
} from '../../state/orders/orders.selectors';
import { filter } from 'rxjs/operators';
import { selectLastOrder } from '../../state/orders/orders.selectors';
import { selectPromoTotals } from '../../state/promo/promo.selectors';
import { PromoTotals } from '../../state/promo/promo.model';


@Component({
  selector: 'app-step4-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './step4-confirm.component.html',
  styleUrls: ['./step4-confirm.component.css']
})
export class Step4ConfirmComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  paymentMethod$!: Observable<string | null>;
  orderNumber$!: Observable<string | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  promoTotals$!: Observable<PromoTotals | null>;


  constructor(private store: Store, private router: Router) {
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
    this.paymentMethod$ = this.store.select(selectPaymentMethod);
    this.orderNumber$ = this.store.select(selectLastOrderNumber);
    this.loading$ = this.store.select(selectOrdersLoading);
    this.error$ = this.store.select(selectOrdersError);
    this.store
      .select(selectLastOrder)
      .pipe(filter(Boolean))
      .subscribe(order => {
        this.router.navigate(['/app/account/orders', order.id]);
    });
    this.promoTotals$ = this.store.select(selectPromoTotals);



  }
  
  confirmOrder() {
    this.store.dispatch(OrdersActions.createOrder());
 }


  backToHome() {
    this.router.navigate(['/app']);
  }
}
