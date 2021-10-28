import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromApp from './reducers/app.reducer';


export interface AppState {
    [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromApp.appFeatureKey]: fromApp.reducer,
};

export const metaReducers: Array<MetaReducer> = [];
