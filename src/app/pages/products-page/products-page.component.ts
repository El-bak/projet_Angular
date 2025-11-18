import { Component, inject } from '@angular/core';
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
    ProductsListComponent
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  // filters
  page = 1;
  pageSize = 10;
  minRating: number | null = null;
  ordering = '';

 store = inject(Store<AppState>);
  
   // Observables
  products$ = this.store.select(selectProductsList);
  loading$ = this.store.select(selectProductsLoading);
  count$ = this.store.select(selectProductsCount);

  

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
    this.page = 1;
    this.load();
  }
}
