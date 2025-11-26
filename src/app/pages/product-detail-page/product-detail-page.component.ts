import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { selectSelectedProduct } from '../../state/products/products.selectors';
import { Product } from '../../../mocks/data';
import * as ProductsActions from '../../state/products/products.actions';
import * as CartActions from '../../state/cart/cart.actions';
import { MatButtonModule } from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'app-product-details-page',
  imports: [CommonModule,RouterLink, MatButtonModule ],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);

  productId = Number(this.route.snapshot.paramMap.get('id'));

  
  product$: Observable<Product & { averageRating: number | null } | null> =
  this.store.select(selectSelectedProduct).pipe(
    map(product => {
      if (!product) return null;
      const ratings = product.ratings || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum: number, r: { user_id: number; value: number }) => sum + r.value, 0) / ratings.length
          : null;
      return { ...product, averageRating };
    })
  );

   ngOnInit() {
    this.store.dispatch(ProductsActions.loadProductById({ id: this.productId }));
   }
  addToCart(product: any, qty = 1) {
    this.store.dispatch(CartActions.addItem({ product, quantity: qty }));
  }
}
