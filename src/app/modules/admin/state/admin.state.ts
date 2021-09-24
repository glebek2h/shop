import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAdmin from '../state/admin.reducer';

export interface AdminState {
    name: string;
    email: string;
    avatar: string;
    isLoad: boolean;
}

export interface AppState {
    [fromAdmin.adminFeatureKey]: AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromAdmin.adminFeatureKey]: fromAdmin.reducer,
};

export const metaReducers: Array<MetaReducer> = [];
