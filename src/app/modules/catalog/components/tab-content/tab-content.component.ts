import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import * as Models from '../../state/catalog.models';

@Component({
    selector: 'app-tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    readonly promos: Array<Models.PromosData>;
    opened = false;

    private readonly dynamicOffersSource$ =
        new BehaviorSubject<Models.OffersCategories>(null);

    @Input() set offersData(categories: Models.OffersCategories) {
        this.dynamicOffersSource$.next(categories);
    }

    private readonly dynamicOffers$ = this.dynamicOffersSource$
        .asObservable()
        .pipe(takeUntil(this.unsubscribe$));

    private readonly dynamicPromoSource$ = new BehaviorSubject<Array<Models.PromosData>>(null);

    @Input() set offersPromos(promos: Array<Models.PromosData>) {
        this.dynamicPromoSource$.next(promos);
    }

    readonly dynamicPromos$ = this.dynamicPromoSource$
        .asObservable()
        .pipe(takeUntil(this.unsubscribe$));

    readonly categories$ = this.dynamicOffers$.pipe(
        map(el => el.categoryNames),
        takeUntil(this.unsubscribe$),
    );

    readonly data$ = this.dynamicOffers$.pipe(
        map(el => el.data.map(el => el)),
        takeUntil(this.unsubscribe$),
    );

    readonly filteredData$ = new BehaviorSubject<Array<Models.CategoriesData>>(null);

    readonly isReadyToDisplay$ = combineLatest([
        this.dynamicOffers$,
        this.dynamicPromos$,
    ]).pipe(
        map(el => el.every(el => !!el)),
        takeUntil(this.unsubscribe$),
    );

    constructor() {}

    ngOnInit(): void {}

    closeOverlay(): void {
        this.opened = !this.opened;
    }

    onHover(categoryName: string): void {
        this.data$
            .pipe(
                take(1),
                map(data => data.filter(el => el.category === categoryName)),
            )
            .subscribe(filteredData => this.filteredData$.next(filteredData));

        this.opened = true;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
