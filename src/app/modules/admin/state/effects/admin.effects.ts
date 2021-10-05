import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { temporaryImgUrl } from 'src/app/shared/utils/utils';
import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
    getAdminInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.getAdminInfo),
            switchMap(() =>
                this.profileService
                    .getProfileInfo()
                    .pipe(
                        map(profile => AdminActions.getProfileInfoSuccess(profile)),
                    ),
            ),
        );
    });

    updateProfileInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.updateProfileInfo),
            switchMap(() =>
                of({
                    name: 'Mike',
                    email: 'Tayson@gmail.com',
                }),
            ),
            map(updatedData =>
                AdminActions.updateProfileInfoSuccess({ updatedData }),
            ),
        );
    });

    removeProfileAvatar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.removeProfileAvatar),
            switchMap(() =>
                of({
                    success: true,
                    message: 'successfully',
                }),
            ),
            map(removeDataResponse =>
                AdminActions.removeProfileAvatarSuccess({
                    removeDataResponse,
                }),
            ),
        );
    });

    uploadProfileAvatar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.uploadProfileAvatar),
            switchMap(() =>
                of({
                    success: true,
                    message: 'successfully',
                }),
            ),
            map(uploadAvatar =>
                AdminActions.uploadProfileAvatarSuccess({ uploadAvatar }),
            ),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly profileService: ProfileService,
    ) {}
}
