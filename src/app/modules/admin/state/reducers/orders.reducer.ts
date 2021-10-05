import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';
import { OrdersState } from '../admin.state';

export const ordersFeatureKey = 'orders-list';

export const initialState: OrdersState = {
    orders: [],
    orderId: null,
};

export const reducer = createReducer(
    initialState,

    on(OrdersActions.getOrdersSuccess, (state, action) => {
        return {
            ...state,
            orders: action.orders,
        };
    }),
    on(OrdersActions.deleteOrder, (state, action) => {
        return {
            ...state,
            orderId: action.orderId
        }
    }),
    on(OrdersActions.deleteOrderSuccess, (state, action) => {
        const ordersFiltered = state.orders.filter(order => order._id !== action.orderId)
        return {
            ...state,
            orders: ordersFiltered
        }
    })
);
