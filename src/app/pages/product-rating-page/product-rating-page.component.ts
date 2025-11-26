import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

import * as RatingActions from '../../state/rating/rating.actions';
import {
  selectRatingLoading,
  selectRatingError,
  selectRatingResponse,
} from '../../state/rating/rating.selectors';

import { selectAccessToken } from '../../state/auth/auth.selectors';
import { MatChip } from "@angular/material/chips";
@Component({
  selector: 'app-product-rating-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    RouterModule,
    MatChip
],
  templateUrl: './product-rating-page.component.html',
  styleUrls: ['./product-rating-page.component.css'],
})
export class ProductRatingPageComponent {
  
  private route = inject(ActivatedRoute);

  productId: number = 0;
  rating: number | null = null;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  response$!: Observable<any>;

  localError: string | null = null;        // ← AJOUT ❶

  token$!: Observable<string | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // → BLOQUE l'appel API si productId invalide
    if (this.productId > 0) {     
      this.store.dispatch(
        RatingActions.loadRating({ productId: this.productId })
      );
    }

    this.loading$ = this.store.select(selectRatingLoading);
    this.error$ = this.store.select(selectRatingError);
    this.response$ = this.store.select(selectRatingResponse);

    this.token$ = this.store.select(selectAccessToken);
  }

  submitRating() {

    // → encore une protection pour éviter un 404 sur le clic
    if (!this.productId || this.productId <= 0) {     // ← AJOUT ❸
      this.localError = "Veuillez entrer un ID produit valide.";
      return;
    }

    if (!this.rating) {
      this.localError = "Veuillez entrer une note";
      return;
    }
    
    this.localError = null;

    this.store.dispatch(
      RatingActions.submitRating({
        productId: this.productId,
        rating: this.rating,
      })
    );
  }
}
