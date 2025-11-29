import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './product-card.component';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  avgRating: number | null;
  image?: string;
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
        [image]="p.image">
      </app-product-card>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      padding: 10px;
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
}
