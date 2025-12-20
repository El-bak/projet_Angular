import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.model';

export const selectOrdersState =
  createFeatureSelector<OrdersState>('orders');

export const selectOrdersList = createSelector(
  selectOrdersState,
  state => state.list
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  state => state.selected
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  state => state.loading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  state => state.error
);

export const selectLastOrder = createSelector(
  selectOrdersState,
  state => state.lastOrder
);

export const selectLastOrderNumber = createSelector(
  selectLastOrder,
  order => order?.orderNumber ?? null
);

export const selectLastOrderId = createSelector(
  selectLastOrder,
  order => order?.id ?? null
);

export const selectOrdersCount = createSelector(
  selectOrdersList,
  orders => orders.length
);

export const selectOrdersTotalAmount = createSelector(
  selectOrdersList,
  orders =>
    orders.reduce((sum, o) => sum + o.total, 0)
);

export const selectDeliveredOrdersCount = createSelector(
  selectOrdersList,
  orders =>
    orders.filter(o => o.status === 'delivered').length
);
