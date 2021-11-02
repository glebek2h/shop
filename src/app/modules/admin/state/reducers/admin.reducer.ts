import { createReducer, on } from '@ngrx/store';
import * as AdminActions from '../actions/admin.actions';
import { AdminInfoState } from '../admin.state';

export const adminFeatureKey = 'profile-info';

export const initialState: AdminInfoState = {
    profile: null,
    isLoad: null,
    avatar: null,
};

export const reducer = createReducer<AdminInfoState>(
    initialState,
    on(AdminActions.getProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            profile: action.profile,
            isLoad: false,
        };
    }),
    on(AdminActions.getAdminInfo, AdminActions.getAvatarInfo, state => {
        return {
            ...state,
            isLoad: true,
        };
    }),
    on(AdminActions.updateProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            profile: action.updatedData,
        };
    }),
    on(AdminActions.getProfileAvatarSuccess, (state, action) => {
        return {
            ...state,
            avatar: action.avatar,
        };
    }),
    on(AdminActions.updateProfileAvatarSuccess, (state, action) => {
        return {
            ...state,
            avatar: action.updatedAvatar,
        };
    }),
    on(AdminActions.removeProfileAvatarSuccess, state => {
        return {
            ...state,
            avatar: null,
        };
    }),
    on(AdminActions.addProfileAvatarSuccess, (state, action) => {
        return {
            ...state,
            avatar: action.addAvatarData,
        };
    }),
);
