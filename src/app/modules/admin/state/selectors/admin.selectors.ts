import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import { AdminInfoState } from '../admin.state';
import { Admin, Avatar } from '../admin.model';

export const selectProfile =
    createFeatureSelector<AdminInfoState>(adminFeatureKey);

export const selectProfileState = createSelector(
    selectProfile,
    (state: AdminInfoState) => state.profile,
);

export const selectProfileAvatarState = createSelector(
    selectProfile,
    (state: AdminInfoState) => state.avatar,
);

export const selectName = createSelector(
    selectProfileState,
    (state: Admin) => state?.name,
);

export const selectId = createSelector(
    selectProfileState,
    (state: Admin) => state?._id,
);

export const selectAvatar = createSelector(
    selectProfileAvatarState,
    (state: Avatar) => state?.imgUrl,
);

export const selectAvatarId = createSelector(
    selectProfileAvatarState,
    (state: Avatar) => state?._id,
);
