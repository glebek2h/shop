import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import { AdminInfoState } from '../admin.state';

export const selectAdminFeature =
    createFeatureSelector<AdminInfoState>(adminFeatureKey);

export const selectName = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.profile.name,
);

export const selectAvatar = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.profile.avatar,
);

export const selectId = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.profile._id,
);
