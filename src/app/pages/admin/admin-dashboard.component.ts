import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../state/admin/admin.actions';
import {
  selectAdminStats,
  selectAdminLoading
} from '../../state/admin/admin.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {

  private store = inject(Store);

  stats$ = this.store.select(selectAdminStats);
  loading$ = this.store.select(selectAdminLoading);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadAdminStats());
  }

  trackById(_: number, item: any) {
    return item.id ?? item.productId;
  }
}
