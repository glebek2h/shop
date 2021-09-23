import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectAvatar, selectName } from '../../state/admin.selectors';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    name$: Observable<any>;
    avatar$: Observable<any>;
    profileAvatar: string;

    ngOnInit(): void {
        this.name$ = this.store.pipe(select(selectName));
        this.avatar$ = this.store.pipe(select(selectAvatar));
        this.avatar$.subscribe(res => {
            this.profileAvatar = res;
        });
    }
}
