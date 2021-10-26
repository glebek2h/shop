import { createReducer, on } from '@ngrx/store';
import * as PromotionsActions from '../actions/promotions.actions';
import { PromotionsState } from '../catalog.state';

export const promotionsFeatureKey = 'promotionsData';

export const initialState: PromotionsState = {
    promotions: [],
};

export const reducer = createReducer(
    initialState,

    on(PromotionsActions.getPromotionsDataSuccess, (state, action) => {
        return {
            ...state,
            promotions: action.promotions,
        };
    }),
);
