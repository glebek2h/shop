import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromotionsState } from '../catalog.state';
import { promotionsFeatureKey } from '../reducers/promotions.reducer';

export const selectPromotionsFeature =
    createFeatureSelector<PromotionsState>(promotionsFeatureKey);

export const selectPromotions = createSelector(
    selectPromotionsFeature,
    (state: PromotionsState) => state.promotions,
);

