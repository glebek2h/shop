import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { AdminState } from '../../state/admin.state';
import * as AdminSelectors from '../../state/admin.selectors';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
    readonly unsubscribe$ = new Subject();
    readonly name$ = this.store.select(AdminSelectors.selectName);
    readonly getAvatar$ = this.store
        .select(AdminSelectors.selectAvatar)
        .pipe(takeUntil(this.unsubscribe$));
    readonly isReadyToDisplay$ = combineLatest([this.name$]).pipe(
        map(data => data.every(el => !!el)),
    );

    constructor(private store: Store<AdminState>) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
