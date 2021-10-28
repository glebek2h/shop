import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import * as AdminModels from '../admin.model';

// upload profile info from BE

export const getAdminInfo = createAction(ActionConstants.CHANGE_PROFILE_INFO);

export const getProfileInfoSuccess = createAction(
    ActionConstants.CHANGE_PROFILE_INFO_SUCCESS,
    props<{ profile: AdminModels.Admin }>(),
);

// upload profile avatar info from BE

export const getAvatarInfo = createAction(
    ActionConstants.CHANGE_PROFILE_AVATAR,
);

export const getProfileAvatarSuccess = createAction(
    ActionConstants.CHANGE_PROFILE_AVATAR_SUCCESS,
    props<{ avatar: AdminModels.Avatar }>(),
);

// update profile info

export const updateProfileInfo = createAction(
    ActionConstants.UPDATE_PROFILE_INFO,
    props<{ updatedData: AdminModels.Admin }>(),
);

export const updateProfileInfoSuccess = createAction(
    ActionConstants.UPDATE_PROFILE_INFO_SUCCESS,
    props<{ updatedData: AdminModels.Admin }>(),
);

// update profile avatar

export const updateProfileAvatar = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR,
    props<{ updatedAvatar: AdminModels.Avatar }>(),
);

export const updateProfileAvatarSuccess = createAction(
    ActionConstants.UPLOAD_PROFILE_AVATAR_SUCCESS,
    props<{ updatedAvatar: AdminModels.Avatar }>(),
);

// remove profile avatar

export const removeProfileAvatar = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR,
    props<{ avatarId: string }>(),
);

export const removeProfileAvatarSuccess = createAction(
    ActionConstants.REMOVE_PROFILE_AVATAR_SUCCESS,
    props<{ message: string }>(),
);

// add profile avatar

export const addProfileAvatar = createAction(
    ActionConstants.ADD_PROFILE_AVATAR,
    props<{ addAvatarData: AdminModels.Avatar }>(),
);

export const addProfileAvatarSuccess = createAction(
    ActionConstants.ADD_PROFILE_AVATAR_SUCCESS,
    props<{ message: string }>(),
);
