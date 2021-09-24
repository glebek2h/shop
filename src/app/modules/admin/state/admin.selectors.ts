import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from './admin.reducer';
import { AdminState } from './admin.state';

export const selectAdminFeature =
    createFeatureSelector<AdminState>(adminFeatureKey);

export const selectName = createSelector(
    selectAdminFeature,
    (state: AdminState) => state.name,
);

export const selectAvatar = createSelector(
    selectAdminFeature,
    (state: AdminState) => state.avatar,
);
