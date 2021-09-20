import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './reducers/app.reducer';

export interface AppState {
  [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromApp.appFeatureKey]: fromApp.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
