import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LinksState } from '../catalog.state';
import { linksFeatureKey } from '../reducers/links.reducer';

export const selectLinksFeature =
    createFeatureSelector<LinksState>(linksFeatureKey);

export const selectLinks = createSelector(
    selectLinksFeature,
    (state: LinksState) => state.links,
);

