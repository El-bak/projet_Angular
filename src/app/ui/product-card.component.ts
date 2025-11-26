import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card" [routerLink]="['/app/shop/product', id]" style="cursor: pointer;">
      <h3>{{ name }}</h3>
      <p>Prix : {{ price }} €</p>
      <p>Note moyenne : {{ avgRating ?? 'N/A' }}</p>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      width: 220px;
      background: #f7f3e9;  /*beige claire*/ 
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    
      .card:hover {
        transform: translateY(-3px);
        box-shadow: O 4px 10px rgba(0,0,0,0,.15);
      }
    }
    h3 {
      margin-bottom: 8px;
      font-size: 18px;
    }
    p {
      margin: 4px 0;
      color: #555;
    }
  `]
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() name!: string;
  @Input() price!: number;
  @Input() avgRating: number | null = null;
}
