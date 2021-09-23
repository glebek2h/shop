import { createReducer } from '@ngrx/store';

export const appFeatureKey = 'app-root';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(initialState);
