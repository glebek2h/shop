import { createReducer, on } from '@ngrx/store';
import * as LinksActions from '../actions/links.actions';
import { LinksState } from '../catalog.state';

export const linksFeatureKey = 'links-list';

export const initialState: LinksState = {
    links: [],
};

export const reducer = createReducer(
    initialState,

    on(LinksActions.getLinksSuccess, (state, action) => {
        return {
            ...state,
            links: action.links,
        };
    }),
);
