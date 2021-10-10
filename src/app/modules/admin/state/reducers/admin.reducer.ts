import { createReducer, on } from '@ngrx/store';
import * as AdminActions from '../actions/admin.actions';
import { AdminInfoState } from '../admin.state';

export const adminFeatureKey = 'profile-info';

export const initialState: AdminInfoState = {
    profile: null,
    isLoad: null,
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
    on(AdminActions.getAdminInfo, state => {
        return {
            ...state,
            isLoad: true,
        };
    }),
    on(AdminActions.updateProfileInfoSuccess, (state, action) => {
        return {
            ...state,
            profile: action.updatedData
        };
    }),
    // https://trello.com/c/uRIjTWIA/12-add-remove-upload-profile-image-integration-wit-api
    // on(AdminActions.removeProfileAvatarSuccess, state => {
    //     return {
    //         ...state,
    //         profile: {
    //             ...state,
    //             avatar: null
    //         }
    //     }
    // })
    // on(AdminActions.uploadProfileAvatarSuccess, (state, action) => {
    //     return {
    //         ...state,
    //         avatar: action.uploadAvatar,
    //     };
    // }),
   
);
