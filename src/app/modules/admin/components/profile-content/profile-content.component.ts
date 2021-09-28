import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as LoadAdminActions from '../../state/actions/admin.actions';
import * as AdminSelect from '../../state/selectors/admin.selectors';
import { Admin } from '../../state/admin.model';
import { AdminState } from '../../state/admin.state';

export interface SafeUrlImpl extends SafeUrl {
    changingThisBreaksApplicationSecurity: string;
}

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContentComponent implements OnInit {
    panelOpenState: boolean;
    fileUrl: SafeUrlImpl;
    dataObj: Admin;
    trustUrl: SafeUrlImpl;
    form: FormGroup;
    readonly getAvatar$ = this.store.select(AdminSelect.selectAvatar);

    constructor(
        private store: Store<AdminState>,
        private sanitazer: DomSanitizer,
    ) {}

    ngOnInit(): void {
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
                this.trustUrl = this.sanitazer.bypassSecurityTrustResourceUrl(
                    this.fileUrl.changingThisBreaksApplicationSecurity,
                ) as SafeUrlImpl;
                this.store.dispatch(
                    LoadAdminActions.uploadProfileAvatar({
                        uploadAvatar: this.trustUrl,
                    }),
                );
            };
        }
    }

    onRemoveFile() {
        this.store.dispatch(LoadAdminActions.removeProfileAvatar());
    }
}
