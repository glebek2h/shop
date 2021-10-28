import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as LoadAdminActions from '../../state/actions/admin.actions';
import * as AdminSelect from '../../state/selectors/admin.selectors';
import { Admin, Avatar } from '../../state/admin.model';
import { AdminState } from '../../state/admin.state';
import { combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContentComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    private dataObj: Admin;
    private updatedDataAvatar: Avatar;
    form: FormGroup;

    readonly selectId$ = this.store
        .select(AdminSelect.selectId)
        .pipe(takeUntil(this.unsubscribe$));
    readonly avatarId$ = this.store
        .select(AdminSelect.selectAvatarId)
        .pipe(takeUntil(this.unsubscribe$));
    readonly getAvatar$ = this.store
        .select(AdminSelect.selectAvatar)
        .pipe(takeUntil(this.unsubscribe$));
    readonly isReadyToDisplay$ = combineLatest([
        this.selectId$,
        this.avatarId$,
        this.getAvatar$,
    ]).pipe(map(el => el.every(el => el !== null)));

    constructor(readonly store: Store<AdminState>) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });
        this.store.dispatch(LoadAdminActions.getAdminInfo());
        this.store.dispatch(LoadAdminActions.getAvatarInfo());
    }

    updateProfile(): void {
        this.selectId$.pipe(take(1)).subscribe(id => {
            this.dataObj = {
                ...this.form.value,
                _id: id,
            };
            this.store.dispatch(
                LoadAdminActions.updateProfileInfo({
                    updatedData: this.dataObj,
                }),
            );
        });
        this.form.reset();
    }

    getFile(event: { target: { files: Blob[] } }): void {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: {
                target: { result: string | ArrayBuffer };
            }) => {
                this.getAvatar$.pipe(take(1)).subscribe(avatar => {
                    this.avatarId$.pipe(take(1)).subscribe(id => {
                        this.updatedDataAvatar = {
                            _id: id,
                            imgUrl: event.target.result,
                        };
                        avatar
                            ? this.store.dispatch(
                                  LoadAdminActions.updateProfileAvatar({
                                      updatedAvatar: this.updatedDataAvatar,
                                  }),
                              )
                            : this.store.dispatch(
                                  LoadAdminActions.addProfileAvatar({
                                      addAvatarData: this.updatedDataAvatar,
                                  }),
                              );
                    });
                });
            };
        } catch (error) {
            window.alert('Please select image');
        }
    }

    onRemoveFile(): void {
        this.avatarId$.pipe(take(1)).subscribe(id => {
            this.store.dispatch(
                LoadAdminActions.removeProfileAvatar({ avatarId: id }),
            );
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
