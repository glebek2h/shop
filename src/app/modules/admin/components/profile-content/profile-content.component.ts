import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
    loadAdminInfo,
    loadProfileAvatar,
    removeProfileAvatar,
} from '../../state/admin.actions';
import { selectAvatar } from '../../state/admin.selectors';

@Component({
    selector: 'app-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
})
export class ProfileContentComponent implements OnInit {
    panelOpenState = false;
    fileUrl: string = '';
    dataObj: any;
    avatar$: Observable<any>;
    trustUrl: any;
    profileAvatar: string;
    form: FormGroup;

    constructor(
        private store: Store<AppState>,
        private sanitazer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        this.avatar$ = this.store.pipe(select(selectAvatar));
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
    }

    submitProfile() {
        this.dataObj = {
            ...this.form.value,
            avatar: this.fileUrl,
        };
        this.store.dispatch(loadAdminInfo({ data: this.dataObj }));
        this.form.reset();
    }

    getFile(event: any) {
        if (event.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: any) => {
                this.fileUrl = event.target.result;
                this.trustUrl = this.sanitazer.bypassSecurityTrustUrl(
                    this.fileUrl,
                );
                let newObj = {
                    ...this.dataObj,
                    avatar: this.fileUrl,
                };
                this.store.dispatch(loadProfileAvatar({ data: newObj }));
            };
        }
    }

    onRemoveFile() {
        let newObj = {
            ...this.dataObj,
            avatar: null,
        };
        this.store.dispatch(removeProfileAvatar({ data: newObj }));
    }
}
