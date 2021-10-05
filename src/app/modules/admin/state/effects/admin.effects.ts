import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';
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
                        map(profile =>
                            AdminActions.getProfileInfoSuccess(profile),
                        ),
                    ),
            ),
        );
    });

    updateProfileInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.updateProfileInfo),
            switchMap(({ updatedData }) =>
                this.profileService.updateProfileInfo(updatedData),
            ),
            map(updatedData =>
                AdminActions.updateProfileInfoSuccess(updatedData),
            ),
        );
    });

    // uploadProfileAvatar$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AdminActions.uploadProfileAvatar),
    //         switchMap(() =>
    //             of({
    //                 success: true,
    //                 message: 'successfully',
    //             }),
    //         ),
    //         map(uploadAvatar =>
    //             AdminActions.uploadProfileAvatarSuccess({ uploadAvatar }),
    //         ),
    //     );
    // });

    // removeProfileAvatar$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AdminActions.removeProfileAvatar),
    //         switchMap(() =>
    //             of({
    //                 success: true,
    //                 message: 'successfully',
    //             }),
    //         ),
    //         map(removeDataResponse =>
    //             AdminActions.removeProfileAvatarSuccess({
    //                 removeDataResponse,
    //             }),
    //         ),
    //     );
    // });

    constructor(
        private readonly actions$: Actions,
        private readonly profileService: ProfileService,
    ) {}
}
