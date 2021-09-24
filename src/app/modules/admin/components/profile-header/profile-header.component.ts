import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { AdminState } from '../../state/admin.state';
import * as AdminSelectors from '../../state/admin.selectors'
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
    name$ = this.store.pipe(select(AdminSelectors.selectName));
    avatar$ = this.store.pipe(select(AdminSelectors.selectAvatar));
    isReadyToDisplay$ = combineLatest([ this.name$]).pipe(map(data => data.every(el => !!el)))
    profileAvatar: string;
    private readonly unsubscribe$ = new Subject();

    constructor(private store: Store<AdminState>) {}

    ngOnInit(): void {
        this.avatar$.subscribe(res => {
            this.profileAvatar = res;
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
