import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import * as LoadAdminActions from '../../state/admin.actions';
import { AdminState } from '../../state/admin.state';
import * as AdminSelect from '../../state/admin.selectors';
import { map } from 'rxjs/operators';
import { Admin } from '../../state/admin.model';

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContentComponent implements OnInit, OnDestroy {
    panelOpenState: boolean;
    fileUrl: string;
    dataObj: Admin;
    trustUrl: SafeUrl;
    profileAvatar: string;
    form: FormGroup;
    avatar$ = this.store.pipe(select(AdminSelect.selectAvatar));
    // isReadyToDisplay$ = combineLatest([this.avatar$]).pipe(map(data => data.every(el => !!el)))
    private readonly unsubscribe$ = new Subject();

    constructor(
        private store: Store<AdminState>,
        private sanitazer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        this.avatar$.subscribe(res => {
            this.profileAvatar = res;
        });
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });
        this.store.dispatch(LoadAdminActions.getAdminInfo());
    }

    updateProfile() {
        this.dataObj = {
            ...this.form.value,
            avatar: this.fileUrl,
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
                this.trustUrl = this.sanitazer.bypassSecurityTrustUrl(
                    this.fileUrl,
                );
            };
            this.store.dispatch(
                LoadAdminActions.uploadProfileAvatar({
                    uploadAvatar: this.trustUrl,
                }),
            );
        }
    }

    onRemoveFile() {
        this.store.dispatch(LoadAdminActions.removeProfileAvatar());
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
