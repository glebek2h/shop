import { createAction, props } from '@ngrx/store';

import { Admin } from './admin.model';

export const loadAdminInfo = createAction(
    '[Profile Change Info] Change Profile Info',
    props<{ data: Admin }>(),
);
export const loadProfileAvatar = createAction(
    '[Profile Change Info] Change Profile Avatar',
    props<{ data: Admin }>(),
);
export const removeProfileAvatar = createAction(
    '[Profile Change Info] Remove Profile Avatar',
    props<{ data: Admin }>(),
);
