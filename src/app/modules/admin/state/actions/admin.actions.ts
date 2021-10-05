import { SafeUrl } from '@angular/platform-browser';
import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import * as AdminModels from '../admin.model';

// upload profile info from BE

export const getAdminInfo = createAction(ActionConstants.CHANGE_PROFILE_INFO);

export const getProfileInfoSuccess = createAction(
    ActionConstants.CHANGE_PROFILE_INFO_SUCCESS,
    props<{ profile: AdminModels.Admin }>(),
);

// update profile info from form

export const updateProfileInfo = createAction(
    ActionConstants.UPDATE_PROFILE_INFO,
    props<{ updatedData: AdminModels.Admin }>(),
);

export const updateProfileInfoSuccess = createAction(
    ActionConstants.UPDATE_PROFILE_INFO_SUCCESS,
    props<{ updatedData: AdminModels.Admin }>(),
);

// remove profile avatar

export const removeProfileAvatar = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR,
);
export const removeProfileAvatarSuccess = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR_SUCCESS,
    props<{ removeDataResponse: AdminModels.RemoveProfileAvatarResponse }>(),
);

// upload profile avatar

export const uploadProfileAvatar = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR,
    props<{ uploadAvatar: SafeUrl }>(),
);

export const uploadProfileAvatarSuccess = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR_SUCCESS,
    props<{ uploadAvatar: SafeUrl }>(),
);
