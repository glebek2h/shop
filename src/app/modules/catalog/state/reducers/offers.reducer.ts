import { createReducer, on } from '@ngrx/store';
import * as OffersActions from '../actions/offers.actions';
import { OffersState } from '../catalog.state';

export const offersFeatureKey = 'offers-list';

export const initialState: OffersState = {
    offers: [],
};

export const reducer = createReducer(
    initialState,

    on(OffersActions.getOffersSuccess, (state, action) => {
        return {
            ...state,
            offers: action.offers,
        };
    }),
);
