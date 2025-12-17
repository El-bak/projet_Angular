import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import * as UserActions from '../../state/user/user.actions';
import {
  selectSelectedOrder,
  selectUserLoading
} from '../../state/user/user.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  order$ = this.store.select(selectSelectedOrder);
  loading$ = this.store.select(selectUserLoading);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(UserActions.loadOrderDetail({ id }));
    }
  }

}
