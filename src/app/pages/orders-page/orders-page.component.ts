import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as OrdersActions from '../../state/orders/orders.actions';
import {
  selectOrdersList,
  selectOrdersLoading
} from '../../state/orders/orders.selectors';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  private store = inject(Store);

  orders$ = this.store.select(selectOrdersList);
  loading$ = this.store.select(selectOrdersLoading);

  ngOnInit(): void {
    this.store.dispatch(OrdersActions.loadOrders());
  }
}
