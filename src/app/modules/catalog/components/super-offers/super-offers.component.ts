import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CatalogState } from '../../state/catalog.state';
import * as OffersActions from '../../state/actions/offers.actions';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as OffersSelect from '../../state/selectors/offers.selectors';

@Component({
    selector: 'app-super-offers',
    templateUrl: './super-offers.component.html',
    styleUrls: ['./super-offers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperOffersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    readonly getOffers$ = this.store
        .select(OffersSelect.selectOffers)
        .pipe(takeUntil(this.unsubscribe$));

    readonly isReadyToDisplay$ = this.getOffers$.pipe(
        map(el => !!el),
        takeUntil(this.unsubscribe$),
    );

    constructor(private readonly store: Store<CatalogState>) {}

    ngOnInit(): void {
        this.store.dispatch(OffersActions.getOffers());
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
