import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import * as CheckoutActions from '../../state/checkout/checkout.actions';

@Component({
  standalone: true,
  selector: 'app-step3-payment',
  imports: [CommonModule, RouterLink],
  templateUrl: './step3-payment.component.html',
  styleUrls: ['./step3-payment.component.css']
})
export class Step3PaymentComponent {

  method: 'card' | 'paypal' | null = null;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  select(method: 'card' | 'paypal') {
    this.method = method;
  }

  next() {
    if (!this.method) return;

    this.store.dispatch(
      CheckoutActions.selectPaymentMethod({ method: this.method })
    );

    this.router.navigate(['/app/shop/checkout/confirm']);
  }
}
