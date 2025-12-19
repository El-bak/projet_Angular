// src/app/shop/checkout/step2-address.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CheckoutActions from '../../state/checkout/checkout.actions';


@Component({
  selector: 'app-step2-address',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './step2-address.component.html',
  styleUrls: ['./step2-address.component.css']
})
export class Step2AddressComponent {
  name = '';
  mail = '';
  address = '';
  city = '';
  postalCode = '';
  country = '';

  constructor(private store: Store, private router: Router) {}

  nextStep() {
    // Ici tu pourrais valider le formulaire avant de continuer
    this.store.dispatch(CheckoutActions.saveAddress({
      address: {
        name: this.name,
        email: this.mail,
        address: this.address,
        city: this.city,
        postalCode: this.postalCode,
        country: this.country
      }
    }));
    this.router.navigate(['/app/shop/checkout/payment']);
  }
}
