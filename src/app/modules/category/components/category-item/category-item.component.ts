import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import * as CategoryConstants from '../../category.constants';
import * as CategoryActions from '../../state/actions/category.actions';
import { CategoryProductData } from '../../state/category.models';
import * as CategorySelectors from '../../state/selectors/category.selectors';

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    filterProducts = [
        {
            value: CategoryConstants.popularValue,
            viewValue: 'CATEGORY.POPULAR',
        },
        {
            value: CategoryConstants.cheapValue,
            viewValue: 'CATEGORY.CHEAP',
        },
        {
            value: CategoryConstants.expensiveValue,
            viewValue: 'CATEGORY.EXPENSIVE',
        },
        {
            value: CategoryConstants.releaseDateValue,
            viewValue: 'CATEGORY.NEW',
        },
        {
            value: CategoryConstants.reviewsValue,
            viewValue: 'CATEGORY.WITH_REVIEWS',
        },
    ];

    selected = CategoryConstants.popularValue;

    readonly categoryProducts$ = this.store
        .select(CategorySelectors.selectCategoryProducts)
        .pipe(
            map(data => data),
            takeUntil(this.unsubscribe$),
        );

    readonly categoryProductTitle$ = this.store
        .select(CategorySelectors.selectCategoryTitle)
        .pipe(
            map(data => data),
            takeUntil(this.unsubscribe$),
        );

    readonly filteredDataSource$ = new BehaviorSubject<
        Array<CategoryProductData>
    >(null);

    readonly filteredData$ = this.filteredDataSource$
        .asObservable()
        .pipe(takeUntil(this.unsubscribe$));

    readonly isReadyToDisplay$ = combineLatest([
        this.categoryProducts$,
        this.categoryProductTitle$,
    ]).pipe(
        map(el => el.every(el => !!el)),
        takeUntil(this.unsubscribe$),
    );

    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.store.dispatch(
                CategoryActions.getCategoryProductsById(params.id),
            );
        });
        this.categoryProducts$.subscribe(data => {
            this.filteredDataSource$.next(
                this.sortFromMinToMax([...data], CategoryConstants.popular),
            );
        });
    }

    filterByValue(value: string): void {
        this.categoryProducts$
            .pipe(
                take(1),
                map(data => this.filterData(data, value)),
            )
            .subscribe(filteredData => {
                this.filteredDataSource$.next(filteredData);
            });
    }

    filterData(
        data: Array<CategoryProductData>,
        value: string,
    ): Array<CategoryProductData> {
        switch (data.length !== 0) {
            case value === CategoryConstants.cheapValue:
                return this.sortFromMinToMax(
                    [...data],
                    CategoryConstants.price,
                );
            case value === CategoryConstants.expensiveValue:
                return this.sortFromMaxToMin(
                    [...data],
                    CategoryConstants.price,
                );
            case value === CategoryConstants.releaseDateValue:
                return this.sortFromMaxToMin(
                    [...data],
                    CategoryConstants.releaseDate,
                );
            case value === CategoryConstants.popularValue:
                return this.sortFromMinToMax(
                    [...data],
                    CategoryConstants.popular,
                );
            case value === CategoryConstants.reviewsValue:
                return this.sortFromMaxToMin(
                    [...data],
                    CategoryConstants.reviews,
                );
        }
    }

    sortFromMinToMax(
        el: Array<CategoryProductData>,
        value: string,
    ): Array<CategoryProductData> {
        return el.sort((a, b) => a[value] - b[value]);
    }
    sortFromMaxToMin(
        el: Array<CategoryProductData>,
        value: string,
    ): Array<CategoryProductData> {
        return el.sort((a, b) => b[value] - a[value]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
