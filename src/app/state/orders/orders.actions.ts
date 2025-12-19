import { createAction, props } from '@ngrx/store';
import { Order } from './orders.model';

export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

export const loadOrderDetail = createAction(
  '[Orders] Load Order Detail',
  props<{ id: string }>()
);

export const loadOrderDetailSuccess = createAction(
  '[Orders] Load Order Detail Success',
  props<{ order: Order }>()
);

export const loadOrderDetailFailure = createAction(
  '[Orders] Load Order Detail Failure',
  props<{ error: string }>()
);

export const createOrder = createAction(
  '[Orders] Create Order'
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: any }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);

export const resetLastOrder = createAction(
  '[Orders] Reset Last Order'
);
