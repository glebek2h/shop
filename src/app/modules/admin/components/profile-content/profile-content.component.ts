import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as LoadAdminActions from '../../state/actions/admin.actions';
import * as AdminSelect from '../../state/selectors/admin.selectors';
import { Admin } from '../../state/admin.model';
import { AdminState } from '../../state/admin.state';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

export interface SafeUrlImpl extends SafeUrl {
    changingThisBreaksApplicationSecurity: string;
}

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContentComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    panelOpenState: boolean;
    fileUrl: SafeUrlImpl;
    dataObj: Admin;
    trustUrl: SafeUrlImpl;
    profileId: string;
    form: FormGroup;
    readonly selectId$ = this.store
        .select(AdminSelect.selectId)
        .pipe(takeUntil(this.unsubscribe$));
    readonly getAvatar$ = this.store
        .select(AdminSelect.selectAvatar)
        .pipe(takeUntil(this.unsubscribe$));

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
        this.selectId$.subscribe(id => {
            this.profileId = id;
        });
    }

    updateProfile() {
        this.dataObj = {
            ...this.form.value,
            avatar: this.fileUrl,
            _id: this.profileId,
        };
        this.store.dispatch(
            LoadAdminActions.updateProfileInfo({ updatedData: this.dataObj }),
        );
        this.form.reset();
    }

    getFile(event: { target: { files: Blob[] } }) {
        if (event.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: { target: { result } }) => {
                this.fileUrl = event.target.result;
                this.trustUrl = this.fileUrl;

                this.store.dispatch(
                    LoadAdminActions.uploadProfileAvatarSuccess({
                        uploadAvatar: this.trustUrl,
                    }),
                );
            };
        }
    }

    onRemoveFile() {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
