import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import { Offers } from '../catalog.models';

export const getOffers = createAction(ActionConstants.GET_OFFERS);

export const getOffersSuccess = createAction(
    ActionConstants.GET_OFFERS_SUCCESS,
    props<{ offers: Array<Offers> }>(),
);

export const getCategoryOffers = createAction(ActionConstants.GET_CATEGORY_OFFERS);

export const getCategoryOffersSuccess = createAction(
    ActionConstants.GET_CATEGORY_OFFERS_SUCCESS,
    props<{categoryOffers: Array<Offers>}>(),
)
