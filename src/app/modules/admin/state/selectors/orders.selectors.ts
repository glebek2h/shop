import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersFeatureKey } from '../reducers/orders.reducer';
import * as AdminModule from '../admin.model';

export const selectOrdersFeature =
    createFeatureSelector<AdminModule.OrdersState>(ordersFeatureKey);

export const selectState = createSelector(
    selectOrdersFeature,
    (state: AdminModule.OrdersState) => state.items,
);
