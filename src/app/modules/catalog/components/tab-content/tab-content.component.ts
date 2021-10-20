import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Models from '../../state/catalog.models';

@Component({
    selector: 'app-tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    private data: Array<Models.CategoriesData>;
    readonly promos: Array<Models.PromosData>;
    categories: Array<Models.CategoryName>;
    filteredData: Array<Models.CategoriesData>;
    hovered = false;
    closed = false;

    private readonly dynamicOffersSource$ =
        new BehaviorSubject<Models.OffersCategories>(null);
    @Input() set offersData(categories: Models.OffersCategories) {
        this.dynamicOffersSource$.next(categories);
    }
    private readonly dynamicOffers$ = this.dynamicOffersSource$
        .asObservable()
        .pipe(takeUntil(this.unsubscribe$));

    private readonly dynamicPromoSource$ = new BehaviorSubject<
        Array<Models.PromosData>
    >(null);
    @Input() set offersPromos(promos: Array<Models.PromosData>) {
        this.dynamicPromoSource$.next(promos);
    }
    readonly dynamicPromos$ = this.dynamicPromoSource$
        .asObservable()
        .pipe(takeUntil(this.unsubscribe$));

    constructor() {}

    ngOnInit(): void {
        this.dynamicOffers$.subscribe(el => {
            this.categories = el.categoryNames;
            this.data = el.data;
        });
    }
    closeOverlay(event: {
        srcElement: { classList: { contains: (arg0: string) => string } };
    }): void {
        if (event.srcElement.classList.contains('overlay-close')) {
            this.closed = !this.closed;
            this.hovered = false;
        }
    }

    onHover(event: { target: { innerText: string } }): void {
        const mouseTarget = event.target.innerText;
        this.filteredData = this.data.filter(el => mouseTarget === el.category);
        this.hovered = true;
        this.closed = false;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
