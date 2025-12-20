import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { selectProductStockStatus, selectSelectedProduct } from '../../state/products/products.selectors';
import { Product } from '../../../mocks/data';
import * as ProductsActions from '../../state/products/products.actions';
import * as CartActions from '../../state/cart/cart.actions';
import { MatButtonModule } from '@angular/material/button';
import * as WishlistActions from '../../state/wishlist/wishlist.actions';
import { MatIconModule } from '@angular/material/icon';
import { isProductInWishlist } from '../../state/wishlist/wishlist.selectors';
import * as ReviewsActions from '../../state/reviews/reviews.actions';
import { selectReviewsByProductId } from '../../state/reviews/reviews.selectors';
import { Review } from '../../state/reviews/reviews.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { selectReviewsLoading } from '../../state/reviews/reviews.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReviewsListComponent } from '../../ui/reviews-list/reviews-list.component';
import { selectIsAuthenticated } from '../../state/auth/auth.selectors';
import { selectReviewsError } from '../../state/reviews/reviews.selectors';


@Component({
  standalone: true,
  selector: 'app-product-details-page',
  imports: [CommonModule,RouterLink, MatButtonModule, MatIconModule, FormsModule, MatCardModule, MatProgressSpinnerModule, ReviewsListComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);

  productId = Number(this.route.snapshot.paramMap.get('id'));

  isInWishlist$!: Observable<boolean>;

  reviews$!: Observable<Review[]>;

  loadingReviews$!: Observable<boolean>;

  
  isLoggedIn$!: Observable<boolean>;
  errorMessage: string | null = null;

  reviewsError$!: Observable<string | null>;

  stockStatus$!: Observable<'out' | 'low' | 'ok' | null>;

  rating = 0;
  comment = '';

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
    this.store.dispatch(
      ProductsActions.loadProductById({ id: this.productId })
    );

    this.store.dispatch(
      ReviewsActions.loadReviews({ productId: this.productId })
    );
    
    this.isInWishlist$ = this.store.select(
      isProductInWishlist(this.productId)
    );

    this.reviews$ = this.store.select(
      selectReviewsByProductId(this.productId)
    );

    this.loadingReviews$ = this.store.select(
      selectReviewsLoading
    );

    this.isLoggedIn$ = this.store.select(
      selectIsAuthenticated
    );

    this.reviewsError$ = this.store.select(
      selectReviewsError
    );

    this.stockStatus$ = this.store.select(
      selectProductStockStatus
    );
      

   }


  showToast = false;
  addToCart(product: any, qty = 1) {
    this.store.dispatch(CartActions.addItem({ product, quantity: qty }));
  
    // Affiche le toast pendant 2 secondes
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);  
  }
  
  toggleWishlist(productId: number) {
    this.store.dispatch(
      WishlistActions.toggleWishlist({ productId })
   );
  }

  submitReview() {
  if (!this.rating || !this.comment) {
    this.errorMessage = 'Veuillez saisir une note et un commentaire';
    return;
  }

  this.errorMessage = null;

  this.store.dispatch(
    ReviewsActions.addReview({
      productId: this.productId,
      rating: this.rating,
      comment: this.comment,
    })
  );

  this.rating = 0;
  this.comment = '';
 }


}
