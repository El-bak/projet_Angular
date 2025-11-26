import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from './state/cart/cart.selectors';
import { AsyncPipe } from '@angular/common';   // ✅ AJOUT IMPORTANT


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');

  private store = inject(Store);

  // 🛒 Observable du nombre d’items dans le panier
  cartCount$: Observable<number> = this.store.select(selectCartCount);
}
