import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers/admin.reducer';
import { AdminInfoState } from '../admin.state';
import { SelectName, SelectAvatar, SelectId } from '../admin.model';

export const selectAdminFeature =
    createFeatureSelector<AdminInfoState>(adminFeatureKey);

export const selectProfile = createSelector(
    selectAdminFeature,
    (state: AdminInfoState) => state.profile,
);
    
export const selectName = createSelector(
    selectProfile,
    (state: SelectName) => state.name,
);

export const selectAvatar = createSelector(
    selectProfile,
    (state: SelectAvatar) => state.avatar,
);

export const selectId = createSelector(
    selectProfile,
    (state: SelectId) => state._id,
);
