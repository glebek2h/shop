import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import { Orders, OrdersData } from '../admin.model';

export const getOrders = createAction(ActionConstants.GET_ORDERS);

export const getOrdersSuccess = createAction(
    ActionConstants.GET_ORDERS_SUCCESS,
    props<{ orders: Array<Orders> }>(),
);

export const deleteOrder = createAction(
    ActionConstants.DELETE_ORDER,
    (orderId: string) => ({ orderId }),
);

export const deleteOrderSuccess = createAction(
    ActionConstants.DELETE_ORDER_SUCCESS,
    (orderId: string) => ({ orderId }),
);
