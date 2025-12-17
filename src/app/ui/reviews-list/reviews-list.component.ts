import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../state/reviews/reviews.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-reviews-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsListComponent {
  @Input() reviews: Review[] | null = [];
  @Input() loading = false;

  trackById(_: number, review: Review) {
    return review.id;
  }
  
  minRating = 0;

  setMinRating(rating: number) {
    this.minRating = rating;
  }

  sortMode: 'rating' | 'date' = 'date';

  setSort(mode: 'rating' | 'date') {
  this.sortMode = mode;
}


  get filteredReviews(): Review[] {
    if (!this.reviews) return [];

    let result = this.reviews.filter(r => r.rating >= this.minRating);

    if (this.sortMode === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
   }

   if (this.sortMode === 'date') {
     result = [...result].sort(
       (a, b) =>
         new Date(b.createdAt).getTime() -
         new Date(a.createdAt).getTime()
     );
   }

   return result;
 }

}
