import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../ui/product-card.component';
import { selectProductsList } from '../../state/products/products.selectors';
import { selectWishlistItems } from '../../state/wishlist/wishlist.selectors';
import { map, combineLatest, Observable } from 'rxjs';
import * as WishlistActions from '../../state/wishlist/wishlist.actions';
import * as CartActions from '../../state/cart/cart.actions';
import { ProductsListComponent } from '../../ui/products-list.component';
import { ProductItem } from '../../ui/products-list.component';
import * as ProductsActions from '../../state/products/products.actions';
import { ToastService } from '../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-wishlist-page',
  imports: [CommonModule, ProductsListComponent],
  templateUrl: './wishlist-page.component.html',
  
})
  
export class WishlistPageComponent {
   products$: Observable<ProductItem[]>;

   constructor(private store: Store, private toast: ToastService) {

  this.products$ = combineLatest([
    this.store.select(selectProductsList),
    this.store.select(selectWishlistItems)
  ]).pipe(
  map(([products, wishlist]) =>
    products
      .filter(p => wishlist.includes(p.id))
      .map(p => {
        const ratings = p.ratings || [];
        const avg =
          ratings.length > 0
            ? ratings.reduce((s: number, r: { value: number }) => s + r.value, 0) / ratings.length
            : null;

        return {
          ...p,
          avgRating: avg
        };
      })
    )
  )

 }
 
 removeFromWishlist(productId: number) {
   this.store.dispatch(
     WishlistActions.toggleWishlist({ productId })
    );

    this.toast.show('Produit retiré de la wishlist ❤️', 'info');
 }

 addToCart(product: any) {
   this.store.dispatch(
     CartActions.addItem({ product, quantity: 1 })
    );

    this.toast.show(
    'Produit ajouté au panier 🛒',
    'success'
  );
 }

 ngOnInit() {
  this.store.dispatch(
    ProductsActions.loadProducts({
      page: 1,
      pageSize: 100
    })
  );
 }


}
