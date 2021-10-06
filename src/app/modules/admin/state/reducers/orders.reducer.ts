import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';
import { OrdersState } from '../admin.state';

export const ordersFeatureKey = 'orders-list';

export const initialState: OrdersState = {
    orders: [],
};

export const reducer = createReducer(
    initialState,

    on(OrdersActions.getOrdersSuccess, (state, action) => {
        return {
            ...state,
            orders: action.orders,
        };
    }),
    on(OrdersActions.deleteOrderSuccess, (state, action) => {
        const ordersFiltered = state.orders.filter(order => order._id !== action.orderId)
        return {
            ...state,
            orders: ordersFiltered
        }
    })
);
