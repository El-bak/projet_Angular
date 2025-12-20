import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as OrdersActions from '../../state/orders/orders.actions';
import {
  selectOrdersList,
  selectOrdersLoading
} from '../../state/orders/orders.selectors';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent implements OnInit {

  private store = inject(Store);

  orders$ = this.store.select(selectOrdersList);
  loading$ = this.store.select(selectOrdersLoading);

  ngOnInit(): void {
    this.store.dispatch(OrdersActions.loadOrders());
  }

  trackByOrderId(_: number, order: any) {
    return order.id;
  }
}






