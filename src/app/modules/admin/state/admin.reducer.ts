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

export const reducer = createReducer(
    initialState,
    on(AdminActions.getProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            name: action.data.name,
            email: action.data.email,
            avatar: action.data.avatar,
            isLoad: true,
        };
    }),
    on(AdminActions.getAdminInfo, state => {
        return {
            ...state,
            isLoad: false,
        };
    }),
    on(AdminActions.updateProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            name: action.updatedData.name,
            email: action.updatedData.email,
        };
    }),
    on(AdminActions.updateProfileInfo, state => {
        return { ...state };
    }),
    on(AdminActions.removeProfileAvatar, state => {
        return {
            ...state,
        };
    }),
    on(AdminActions.removeProfileAvatarSuccess, (state, action) => {
        return {
            ...state,
            avatar: action.removeDataResponse.avatar,
        };
    }),
    on(AdminActions.uploadProfileAvatar, (state, action) => {
        return {
            ...state,
        };
    }),
    on(AdminActions.uploadProfileAvatarSuccess, (state, action) => {
        return {
            ...state,
            avatar: action.uploadAvatar.avatar,
        };
    }),
);
