import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule],
  template: `
    <div class="product">

      <img *ngIf="image" [src]="image" [alt]="name" class="img" />

      <h2>{{ name }}</h2>
      <p class="price">{{ price }} €</p>

      <div class="rating">⭐ {{ avgRating }}/5</div>

      <p class="desc">{{ description }}</p>

      <button class="add-btn" (click)="add.emit()">Ajouter au panier</button>

    </div>
  `,
  styles: [`
    .product { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .img { width: 200px; border-radius: 10px; margin-bottom: 10px; }
    .price { color: green; font-weight: bold; }
    .add-btn {
      margin-top: 10px;
      padding: 8px 12px;
      background: #3f51b5;
      color: white;
      border-radius: 6px;
    }
  `]
})
export class ProductDetailsComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() avgRating = 0;
  @Input() description = '';
  @Input() image = '';

  @Output() add = new EventEmitter<void>();
}
