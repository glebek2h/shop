import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Links, Offers, PromotionsData } from './catalog.models';
import * as fromOffers from './reducers/offers.reducer';
import * as fromLinks from './reducers/links.reducer';
import * as fromPromotions from './reducers/promotions.reducer';

export interface OffersState {
    offers: Array<Offers>;
}

export interface LinksState {
    links: Array<Links>;
}

export interface PromotionsState {
    promotions: Array<PromotionsData>;
}

export interface CatalogState {
    [fromOffers.offersFeatureKey]: OffersState;
    [fromLinks.linksFeatureKey]: LinksState;
    [fromPromotions.promotionsFeatureKey]: PromotionsState;
}

export const reducers: ActionReducerMap<CatalogState> = {
    [fromOffers.offersFeatureKey]: fromOffers.reducer,
    [fromLinks.linksFeatureKey]: fromLinks.reducer,
    [fromPromotions.promotionsFeatureKey]: fromPromotions.reducer,
};

export const metaReducers: Array<MetaReducer> = [];
