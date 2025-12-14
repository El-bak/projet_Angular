import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from './state/cart/cart.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';   // AJOUT IMPORTANT
import { selectIsAuthenticated } from './state/auth/auth.selectors';
import * as AuthActions from './state/auth/auth.actions';
import { selectWishlistCount } from './state/wishlist/wishlist.selectors';
import { ToastComponent } from './pages/toast.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, CommonModule, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');

  private store = inject(Store);
  



  // 🛒 Observable du nombre d’items dans le panier
  cartCount$: Observable<number> = this.store.select(selectCartCount);

  //  Observable pour wishlist
   wishlistCount$ = this.store.select(selectWishlistCount);

  // 🔐 Auth observable
  isAuth$: Observable<boolean> = this.store.select(selectIsAuthenticated);

  // 🚪 Déconnexion
  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  
}
