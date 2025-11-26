import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../state/cart/cart.selectors';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/app/shop/cart" class="cart-icon">
      🛒
      <span class="badge" *ngIf="count$ | async as c">{{ c }}</span>
    </a>
  `,
  styles: [`
    .cart-icon { position: relative; text-decoration: none; color: inherit; font-size: 18px;}
    .badge {
      position: absolute; top: -6px; right: -10px;
      background: #ff4d4f; color: white; border-radius: 999px;
      padding: 2px 6px; font-size: 12px;
    }
  `]
})
export class CartIconComponent {
  count$: Observable<number>;
  constructor(private store: Store) {
    this.count$ = this.store.select(selectCartCount);
  }
}
