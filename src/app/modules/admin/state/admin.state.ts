import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAdmin from '../state/admin.reducer';

export interface AppState {
    [fromAdmin.adminFeatureKey]: fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromAdmin.adminFeatureKey]: fromAdmin.reducer,
};

export const metaReducers: Array<MetaReducer<any, any>> = [];
