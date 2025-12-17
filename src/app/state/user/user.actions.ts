// src/app/state/user/user.actions.ts

import { createAction, props } from '@ngrx/store';
import { OrderSummary } from './user.model';

export const loadUserProfile = createAction('[User] Load Profile');
export const loadUserProfileSuccess = createAction(
  '[User] Load Profile Success',
  props<{ profile: any }>()
);
export const loadUserProfileFailure = createAction(
  '[User] Load Profile Failure',
  props<{ error: string }>()
);

export const updateUserProfile = createAction(
  '[User] Update Profile',
  props<{ changes: Partial<any> }>()
);

export const loadUserOrders = createAction('[User] Load Orders');

export const loadUserOrdersSuccess = createAction(
  '[User] Load Orders Success',
  props<{ orders: OrderSummary[] }>()
);

export const loadUserOrdersFailure = createAction(
  '[User] Load Orders Failure',
  props<{ error: string }>()
);

export const updateUserProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ profile: any }>()
);

export const updateUserProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);

/*Ajouté à 15/12/2025 à 22:14*/

export const loadOrderDetail = createAction(
  '[User] Load Order Detail',
  props<{ id: string }>()
);

export const loadOrderDetailSuccess = createAction(
  '[User] Load Order Detail Success',
  props<{ order: any }>() //modifé OrderSummary to any à 23:00 le 15/12/2025
);

export const loadOrderDetailFailure = createAction(
  '[User] Load Order Detail Failure',
  props<{ error: string }>()
);
/*Fin Ajouté à 15/12/2025 à 22:14*/

  
