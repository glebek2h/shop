import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { AdminState } from './admin.state';

export const adminFeatureKey = 'profile-info';

export const initialState: AdminState = {
    name: null,
    email: null,
    avatar: null,
    isLoad: null,
};

export const reducer = createReducer<AdminState>(
    initialState,
    on(AdminActions.getProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            // data: action.data,
            name: action.data.name,
            email: action.data.email,
            avatar: action.data.avatar,
            isLoad: false,
        };
    }),
    on(AdminActions.getAdminInfo, state => {
        return {
            ...state,
            isLoad: true,
        };
    }),
    on(AdminActions.updateProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            name: action.updatedData.name,
            email: action.updatedData.email,
        };
    }),
    on(AdminActions.RemoveProfileAvatarResponse, (state) => {
        return {
            ...state,
            avatar: null,
        };
    }),
    on(AdminActions.uploadProfileAvatar, (state, action) => {
        return {
            ...state,
            avatar: action.uploadAvatar,
        };
    }),
);
