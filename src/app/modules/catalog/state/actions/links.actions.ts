import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import { Links } from '../catalog.models';

export const getLinks = createAction(ActionConstants.GET_LINKS);

export const getLinksSuccess = createAction(
    ActionConstants.GET_LINKS_SUCCESS,
    props<{ links: Array<Links> }>(),
);
