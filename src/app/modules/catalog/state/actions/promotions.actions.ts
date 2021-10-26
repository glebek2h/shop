import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import {  PromotionsData } from '../catalog.models';

export const getPromotionsData = createAction(ActionConstants.GET_PROMOTIONS_DATA);

export const getPromotionsDataSuccess = createAction(
    ActionConstants.GET_PROMOTIONS_DATA_SUCCESS,
    props<{ promotions: Array<PromotionsData> }>(),
);
