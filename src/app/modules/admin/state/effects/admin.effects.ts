import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge } from 'rxjs';
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';
import * as AdminActions from '../actions/admin.actions';
import { Admin, Avatar } from '../admin.model';

@Injectable()
export class AdminEffects {
    getAdminInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.getAdminInfo, AdminActions.getAvatarInfo),
            exhaustMap(() =>
                merge(
                    this.profileService
                        .getProfileInfo()
                        .pipe(
                            map(profile =>
                                AdminActions.getProfileInfoSuccess(profile),
                            ),
                        ),
                    this.profileService
                        .getProfileAvatar()
                        .pipe(
                            map(avatar =>
                                AdminActions.getProfileAvatarSuccess(avatar),
                            ),
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
            mergeMap((updatedData: Admin) => [
                AdminActions.updateProfileInfoSuccess({ updatedData }),
                AdminActions.getAdminInfo(),
            ]),
        );
    });

    updateProfileAvatar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.updateProfileAvatar),
            switchMap(({ updatedAvatar }) =>
                this.profileService.updateProfileAvatar(updatedAvatar),
            ),
            mergeMap((updatedAvatar: Avatar) => [
                AdminActions.updateProfileAvatarSuccess({ updatedAvatar }),
                AdminActions.getAvatarInfo(),
            ]),
        );
    });

    addProfileAvatar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.addProfileAvatar),
            switchMap(({ addAvatarData }) =>
                this.profileService.addAvatar(addAvatarData),
            ),
            mergeMap(message => [
                AdminActions.addProfileAvatarSuccess({ message }),
            ]),
        );
    });

    removeProfileAvatar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.removeProfileAvatar),
            switchMap(({ avatarId }) =>
                this.profileService.deleteAvatar(avatarId),
            ),
            mergeMap(message => [
                AdminActions.removeProfileAvatarSuccess({ message }),
            ]),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly profileService: ProfileService,
    ) {}
}
