import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, State } from '../reducers/app.reducer';

export const selectAppFeature = createFeatureSelector<State>(appFeatureKey);

export const selectName = createSelector(
    selectAppFeature,
    (state: State) => state,
);
