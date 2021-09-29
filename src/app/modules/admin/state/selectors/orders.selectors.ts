import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersFeatureKey } from '../reducers/orders.reducer';
import { OrdersState } from '../admin.state';

export const selectOrdersFeature =
    createFeatureSelector<OrdersState>(ordersFeatureKey);

export const selectState = createSelector(
    selectOrdersFeature,
    (state: OrdersState) => state.orders,
);
