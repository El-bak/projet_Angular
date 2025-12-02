// src/app/shop/cart/cart-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-row">

      <img *ngIf="item.image"
           class="thumb"
           [src]="item.image"
           [alt]="item.name" />

      <div class="left">
        <strong>{{ item.name }}</strong>
        <div>{{ item.price }} €</div>
      </div>

      <div class="center qty-controls">

        <button class="qty-btn" (click)="decrease()">−</button>

        <span class="qty">{{ item.quantity }}</span>

        <button class="qty-btn" (click)="increase()">+</button>

      </div>

      <div class="right">
        <button class="remove-btn" (click)="remove.emit()">Supprimer</button>
      </div>

    </div>
  `,
  styles: [`
    .cart-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #ddd;
    }

    .thumb {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      object-fit: cover;
      margin-right: 18px;
    }

    .left { flex: 2; }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .qty-btn {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: #fafafa;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      transition: 0.2s;
    }

    .qty-btn:hover {
      background: #e5e5e5;
    }

    .qty {
      min-width: 20px;
      text-align: center;
      font-weight: bold;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .remove-btn {
      border: none;
      background: transparent;
      color: #b30000;
      cursor: pointer;
    }

    .remove-btn:hover {
      text-decoration: underline;
    }
  `]
})
export class CartItemComponent {

  @Input() item!: { productId: number; name: string; price: number; quantity: number; image?: string };
  @Output() remove = new EventEmitter<void>();
  @Output() quantityChange = new EventEmitter<number>();

  increase() {
    this.quantityChange.emit(this.item.quantity + 1);
  }

  decrease() {
    if (this.item.quantity > 1) {
      this.quantityChange.emit(this.item.quantity - 1);
    }
  }
}
