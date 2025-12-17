import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './product-card.component';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  avgRating: number | null;
  image?: string;
  isNew?: boolean;
  inStock?: boolean;

  /*Ajout */
  stockStatus?: 'ok' | 'low' | 'out';
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="grid">
      <app-product-card
        *ngFor="let p of products"
        [id]="p.id"
        [name]="p.name"
        [price]="p.price"
        [avgRating]="p.avgRating"
        [image]="p.image"
        [isNew]="p.isNew"
        [inStock]="p.inStock"
        [stockStatus]="p.stockStatus"
        [showRemove]="showRemove"
        (add)="add.emit(p)"
        (toggleWishlist)="toggleWishlist.emit(p)"
        [isInWishlist]="true"
      ></app-product-card>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    
    /* écran moyen */
    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* mobile */
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .thumb {
      width: 100%;
      height: 160px;
      border-radius: 6px;
      object-fit: cover;
      margin-bottom: 10px;
    }
  `]
})
export class ProductsListComponent {
  @Input() products: ProductItem[] = [];
  @Output() add = new EventEmitter<ProductItem>();
  @Output() toggleWishlist = new EventEmitter<ProductItem>();
  @Input() showRemove = false;

}
