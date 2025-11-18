import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
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
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  @Input() name!: string;
  @Input() price!: number;
  @Input() avgRating: number | null = null;
}
