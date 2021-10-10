import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import { AdminInfoState } from '../admin.state';
import { Admin } from '../admin.model';

export const selectProfile =
    createFeatureSelector<AdminInfoState>(adminFeatureKey);

export const selectProfileState = createSelector(
    selectProfile,
    (state: AdminInfoState) => state.profile,
);
    
export const selectName = createSelector(
    selectProfileState,
    (state: Admin) => state.name,
);

export const selectAvatar = createSelector(
    selectProfileState,
    (state: Admin) => state.avatar,
);

export const selectId = createSelector(
    selectProfileState,
    (state: Admin) => state._id
);
