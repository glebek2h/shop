import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromApp from './reducers/app.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
    reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
    return localStorageSync({
        keys: ['app-root', 'profile-info'],
        rehydrate: true,
    })(reducer);
}

export interface AppState {
    [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromApp.appFeatureKey]: fromApp.reducer,
};

export const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];
