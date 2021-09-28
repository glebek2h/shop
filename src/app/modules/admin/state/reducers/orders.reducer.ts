import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';
import * as AdminModels from '../admin.model';

export const ordersFeatureKey = 'orders-list';

export const initialState: AdminModels.OrdersState = {
    items: [],
};

export const reducer = createReducer(
    initialState,

    on(OrdersActions.getOrdersSuccess, (state, action) => {
        return {
            ...state,
            items: action.orders.items,
        };
    }),
);
