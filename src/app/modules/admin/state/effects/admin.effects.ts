import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { temporaryImgUrl } from 'src/app/shared/utils/utils';
import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
    getAdminInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.getAdminInfo),
            switchMap(() =>
                of({
                    name: 'Seva',
                    email: 'seva@mail.com',
                    avatar: temporaryImgUrl,
                }),
            ),
            map(data => AdminActions.getProfileInfoSuccess({ data })),
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
                AdminActions.RemoveProfileAvatarResponse({
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
            map(message =>
                AdminActions.uploadProfileAvatarSuccess({ message }),
            ),
        );
    });

    constructor(private actions$: Actions) {}
}
