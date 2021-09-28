import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import * as AdminModule from '../admin.model';

export const selectAdminFeature =
    createFeatureSelector<AdminModule.AdminInfoState>(adminFeatureKey);

export const selectName = createSelector(
    selectAdminFeature,
    (state: AdminModule.AdminInfoState) => state.name,
);

export const selectAvatar = createSelector(
    selectAdminFeature,
    (state: AdminModule.AdminInfoState) => state.avatar,
);
