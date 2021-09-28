import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import { AdminInfoState } from '../admin.state';

export const selectAdminFeature =
    createFeatureSelector<AdminInfoState>(adminFeatureKey);

export const selectName = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.name,
);

export const selectAvatar = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.avatar,
);
