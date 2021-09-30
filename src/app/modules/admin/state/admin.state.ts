import { SafeUrl } from '@angular/platform-browser';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as AdminModels from './admin.model';
import * as fromAdmin from './reducers/admin.reducer';
import * as fromOrders from './reducers/orders.reducer';

export interface AdminInfoState {
    name: string;
    email: string;
    avatar: SafeUrl;
    isLoad: boolean;
}

export interface OrdersState {
    items: Array<AdminModels.Orders>;
}

export interface AdminState {
    [fromAdmin.adminFeatureKey]: AdminInfoState;
    [fromOrders.ordersFeatureKey]: OrdersState;
}

export const reducers: ActionReducerMap<AdminState> = {
    [fromAdmin.adminFeatureKey]: fromAdmin.reducer,
    [fromOrders.ordersFeatureKey]: fromOrders.reducer,
};

export const metaReducers: Array<MetaReducer> = [];
