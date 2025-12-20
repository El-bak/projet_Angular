import { Component, inject, ChangeDetectionStrategy } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProductsListComponent } from '../../ui/products-list.component';

import { Store } from '@ngrx/store';
import * as ProductsActions from '../../state/products/products.actions';
import {
  selectProductsList,
  selectProductsLoading,
  selectProductsCount,
} from '../../state/products/products.selectors';

import { AppState } from '../../state/app.state';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { MatChip } from "@angular/material/chips";
import { selectAccessToken } from '../../state/auth/auth.selectors';
import { map } from 'rxjs/operators';
import * as CartActions from '../../state/cart/cart.actions';
import * as WishlistActions from '../../state/wishlist/wishlist.actions';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ProductsListComponent,
    RouterLink,
    MatChip,
    RouterModule
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent {
  page = 1;
  pageSize = 10;
  minRating: number | null = null;
  ordering = '';

  store = inject(Store<AppState>);

  // ⭐⭐ → Ici on calcule la moyenne des notes
  products$ = this.store.select(selectProductsList).pipe(
    map(products =>
      products.map(p => {
        const ratings = p.ratings || [];
        const avg =
          ratings.length > 0
            ? ratings.reduce((sum: number, r: { value: number }) => sum + r.value, 0) / ratings.length
            : null;
        
        let stockStatus: 'ok' | 'low' | 'out' = 'ok';

        if (p.stock === 0) stockStatus = 'out';
        else if (p.lowStockThreshold && p.stock <= p.lowStockThreshold)
          stockStatus = 'low';    

        return {
          ...p,
          avgRating: avg,
          stockStatus,
          isNew: p.isNew ?? false,      // ou une règle réelle
          inStock: p.inStock ?? false     // ou une règle réelle
        };
      })
    )
  );

  loading$ = this.store.select(selectProductsLoading);
  count$ = this.store.select(selectProductsCount);
  token$ = this.store.select(selectAccessToken);

  ngOnInit() {
    this.load();
  }

  load() {
    this.store.dispatch(
      ProductsActions.loadProducts({
        page: this.page,
        pageSize: this.pageSize,
        minRating: this.minRating ?? undefined,
        ordering: this.ordering ?? undefined,
      })
    );
  }

  nextPage() {
    this.page++;
    this.load();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }

  onApplyFilters() {
    this.load();
  }
  
  showToast = false;

  addToCart(product: any) {
    this.store.dispatch(CartActions.addItem({ product, quantity: 1}));

     this.showToast = true;

  setTimeout(() => (this.showToast = false), 1500);
  }

  toggleWishlist(product: { id: number }) {
  this.store.dispatch(
    WishlistActions.toggleWishlist({ productId: product.id })
  );

 }

}
