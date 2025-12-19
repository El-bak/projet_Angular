import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { OrdersState } from './orders.model';

export const initialState: OrdersState = {
  list: [],
  selected: null,
  lastOrder: null,
  loading: false,
  error: null
};

export const ordersReducer = createReducer(
  initialState,

  on(OrdersActions.loadOrders, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    list: orders
  })),

  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.loadOrderDetail, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrdersActions.loadOrderDetailSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    selected: order
  })),

  on(OrdersActions.loadOrderDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.createOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    lastOrder: order,
    list: [...state.list, order]
  })),

  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.resetLastOrder, state => ({
    ...state,
    lastOrder: null
  }))
);

