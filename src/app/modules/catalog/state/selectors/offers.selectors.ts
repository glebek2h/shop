import { createFeatureSelector, createSelector } from '@ngrx/store';
import { offersFeatureKey } from '../reducers/offers.reducer';
import { OffersState } from '../catalog.state';

export const selectOffersFeature =
    createFeatureSelector<OffersState>(offersFeatureKey);

export const selectOffers = createSelector(
    selectOffersFeature,
    (state: OffersState) => state.offers,
);
