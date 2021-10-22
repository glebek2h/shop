import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
    closed = false;

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
        map(el => el.data),
        takeUntil(this.unsubscribe$),
    );

    filteredData$: Observable<Array<Models.CategoriesData>>;

    constructor() {}

    ngOnInit(): void {}

    closeOverlay(): void {
        this.closed = !this.closed;
        this.opened = false;
    }

    onHover(categoryName: string): void {
        this.filteredData$ = this.data$.pipe(
            map(el => el.filter(el => el.category === categoryName)),
            takeUntil(this.unsubscribe$),
        );
        this.opened = true;
        this.closed = false;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
