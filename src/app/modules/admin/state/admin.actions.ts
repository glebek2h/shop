import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import { Admin, RemoveProfileAvatar, UpdatedProfile, UpdateProfileAvatar } from './admin.model';

// upload profile info from BE

export const getAdminInfo = createAction(ActionConstants.CHANGE_PROFILE_INFO);

export const getProfileInfoSuccess = createAction(
    ActionConstants.CHANGE_PROFILE_INFO_SUCCESS,
    props<{ data: Admin }>(),
);

// update profile info from form

export const updateProfileInfo = createAction(
    ActionConstants.UPDATE_PROFILE_INFO,
    props<{ updatedData: UpdatedProfile }>(),
);

export const updateProfileInfoSuccess = createAction(
    ActionConstants.UPDATE_PROFILE_INFO_SUCCESS,
    props<{ updatedData: UpdatedProfile }>(),
);

// remove profile avatar

export const removeProfileAvatar = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR,
);
export const removeProfileAvatarSuccess = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR_SUCCESS,
    props<{ removeDataResponse: RemoveProfileAvatar }>(),
);

// upload profile avatar

export const uploadProfileAvatar = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR,
    props<{uploadAvatar: any}>()
);

export const uploadProfileAvatarSuccess = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR_SUCCESS,
    props<{uploadAvatar: any}>()
)