import { Action, createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';

export const adminFeatureKey = 'profile-info';

export interface AdminState {
    name: string;
    email: string;
    avatar: string;
}

export const initialState: AdminState = {
    name: null,
    email: null,
    avatar: null,
};

export const reducer = createReducer(
    initialState,
    on(AdminActions.loadAdminInfo, (state, action) => {
        return {
            ...state,
            name: action.data.name,
            email: action.data.email,
        };
    }),
    on(AdminActions.loadProfileAvatar, (state, action) => {
        return {
            ...state,
            avatar: action.data.avatar,
        };
    }),
    on(AdminActions.removeProfileAvatar, (state, action) => {
        return {
            ...state,
            avatar: action.data.avatar,
        };
    }),
);
