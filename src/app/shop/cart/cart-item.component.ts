// src/app/shop/cart/cart-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-row">
      <div class="left">
        <strong>{{ item.name }}</strong>
        <div>{{ item.price }} €</div>
      </div>
      <div class="center">
        <input type="number" min="1" [value]="item.quantity" 
          (change)="quantityChange.emit($any($event.target).valueAsNumber)" />
      </div>
      <div class="right">
        <button (click)="remove.emit()">Supprimer</button>
      </div>
    </div>
  `,
  styles: [`
    .cart-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
    .left { flex: 2; }
    .center { flex: 1; display: flex; justify-content: center; }
    .right { flex: 1; display: flex; justify-content: flex-end; }
    input { width: 50px; text-align: center; }
  `]
})
export class CartItemComponent {
  @Input() item!: { productId: number; name: string; price: number; quantity: number };
  @Output() remove = new EventEmitter<void>();
  @Output() quantityChange = new EventEmitter<number>();
}
