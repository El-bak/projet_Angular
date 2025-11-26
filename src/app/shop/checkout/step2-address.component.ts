// src/app/shop/checkout/step2-address.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2-address.component.html',
  styleUrls: ['./step2-address.component.css']
})
export class Step2AddressComponent {
  name = '';
  address = '';
  city = '';
  postalCode = '';
  country = '';

  constructor(private router: Router) {}

  nextStep() {
    // Ici tu pourrais valider le formulaire avant de continuer
    this.router.navigate(['/app/shop/checkout/confirm']);
  }
}
