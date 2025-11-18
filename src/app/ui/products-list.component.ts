import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  avgRating: number | null;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="grid">
      <app-product-card
        *ngFor="let p of products"
        [name]="p.name"
        [price]="p.price"
        [avgRating]="p.avgRating">
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
  `]
})
export class ProductsListComponent {
  @Input() products: ProductItem[] = [];
}
