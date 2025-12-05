import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cart-summary',
  imports: [CommonModule],
  template: `
    <h3>Résumé du panier</h3>

    <div *ngFor="let it of items" class="row">
      <span>{{ it.name }} x {{ it.quantity }}</span>
      <strong>{{ it.price * it.quantity }} €</strong>
    </div>

    <hr />
    <p>Total : <strong>{{ total }} €</strong></p>
  `,
  styles: [`
    .row { display: flex; justify-content: space-between; padding: 6px 0; }
  `]
})
export class CartSummaryComponent {
  @Input() items: any[] = [];
  @Input() total = 0;
}
