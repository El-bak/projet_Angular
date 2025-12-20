import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    
    <div class="card">
      
      <img *ngIf="image"
            [src]="image"
            class="thumb"
            alt="{{name}}" />

      <h3>{{ name }}</h3>
      <p>Prix : {{ price }} €</p>

      <button class="heart-btn" aria-label="Ajouter à la wishlist" (click)="toggle()">
      {{ isInWishlist ? '❤️' : '🤍' }} 
      </button>

      <div class="badge stock ok" *ngIf="stockStatus === 'ok'">En stock</div>
      <div class="badge stock low" *ngIf="stockStatus === 'low'">Stock faible</div>
      <div class="badge stock out" *ngIf="stockStatus === 'out'">Rupture</div>

      <div class="rating-block" *ngIf="avgRating !== null">
    <div class="stars">
      <ng-container *ngFor="let s of [1,2,3,4,5]">
        <span class="star" [class.filled]="s <= avgRating">★</span>
      </ng-container>
    </div>

    <p class="rating-info">
      {{ avgRating | number:'1.1-1' }}/5
    </p>
  </div>

  <p *ngIf="avgRating === null">Note : N/A</p>
   
  <button class="details-btn"
        [routerLink]="['/app/shop/product', id]"
        (click)="$event.stopPropagation()">
  Voir les détails
</button>

  <button
  class="add-btn" 
  aria-label="Ajouter au panier"
  [disabled]="stockStatus === 'out'"
  (click)="add.emit(); $event.stopPropagation()">
  Ajouter au panier
</button>

  <button
  *ngIf="showRemove"
  class="remove-btn"
  (click)="toggleWishlist.emit(id)">
     🗑 Retirer
  </button>


</div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      width: 220px;
      background: #f7f3e9;  /*beige claire*/ 
      box-shadow: 0 4px 12px rgba(0,0,0,0.8);
      transition: transform 0.2s, box-shadow 0.2s;
    
      .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0,0,0,0,.15);
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
     
    .thumb {
      width: 100%;
      height: 160px;
      border-radius: 6px;
      object-fit: cover;
      margin-bottom: 10px;
    }

    .rating-block {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 6px 0;
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      font-size: 18px;
      color: #ccc; /* gris vide */
    }

    .star.filled {
      color: #f5a623; /* orange Amazon */
    }

    .rating-info {
      font-size: 14px;
      color: #333;
    }

    .add-btn {
      margin-top: 8px;
      width: 75%;
      padding: 8px;
      background: #d4a574;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      color: blqck;
      transition: 0.2s;
    }

    .add-btn:hover {
      background: #d4a574;
    }

    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
    
    .badge.new {
       background: #ff4081; /* rose */ 
    }
    
    .badge.stock {
      background: #4caf50; /* vert */
    }

    .card {
      position: relative;
    }
    
    .details-btn {
      margin-top: 8px;
      width: 75%;
      padding: 8px;
      background: #6d9ac4; /* bleu doux */
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      color: black;
      transition: 0.2s;
    }

    .details-btn:hover {
      background: #5b88b0;
    }

    .heart-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 22px;
    }

    .remove-btn {
      margin-top: 6px;
      width: 75%;
      padding: 6px;
      background: #c0392b;
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .remove-btn:hover {
      background: #a93226;
    }

    .badge.stock.ok { background: #4caf50; }
    .badge.stock.low { background: #ff9800; }
    .badge.stock.out { background: #f44336; }



  `]
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() name!: string;
  @Input() price!: number;
  @Input() avgRating: number | null = null;
  @Input() image?: string = "";

  @Output() add = new EventEmitter<void>();
  
  /*permettant de savoir si il y'a en stock*/ 
  @Input() isNew?: boolean;
  @Input() inStock?: boolean;
  @Output() toggleWishlist = new EventEmitter<number>();   // ⬅ à ajouter
  @Input() showRemove = false;
  @Input() isInWishlist = false;
  @Input() stockStatus?: 'ok' | 'low' | 'out';



  constructor(private toast: ToastService) {}

toggle() {
  this.toggleWishlist.emit(this.id);
  this.toast.show('Produit ajouté à la wishlist ❤️', 'success');
}



}
