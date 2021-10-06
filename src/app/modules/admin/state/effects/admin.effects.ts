import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';
import * as AdminActions from '../actions/admin.actions';
import { Admin } from '../admin.model';

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
            mergeMap((updatedData: Admin) =>
                [
                    AdminActions.updateProfileInfoSuccess({updatedData}),
                    AdminActions.getAdminInfo(),
                ]
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
