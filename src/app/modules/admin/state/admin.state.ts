import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as AdminModels from './admin.model';
import * as fromAdmin from './reducers/admin.reducer';
import * as fromOrders from './reducers/orders.reducer';

export interface AdminState {
    [fromAdmin.adminFeatureKey]: AdminModels.AdminInfoState;
    [fromOrders.ordersFeatureKey]: AdminModels.OrdersState;
}

export const reducers: ActionReducerMap<AdminState> = {
    [fromAdmin.adminFeatureKey]: fromAdmin.reducer,
    [fromOrders.ordersFeatureKey]: fromOrders.reducer,
};

export const metaReducers: Array<MetaReducer> = [];
