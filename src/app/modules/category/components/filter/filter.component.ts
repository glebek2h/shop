import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share/share.service';
import { FilterItem } from '../../state/category.models';
import * as CategorySelectors from '../../state/selectors/category.selectors';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    private readonly filterItemsArray$ = this.shareService.getData();
    private filterItemFromTo: FilterItem;

    readonly filteredDataSource$ = new BehaviorSubject<FilterItem[]>(null);
    readonly filteredData$ = this.filteredDataSource$.asObservable();

    readonly selectFilterData$ = this.store
        .select(CategorySelectors.selectFilterData)
        .pipe(
            filter(el => el !== undefined),
            map(el => el),
            takeUntil(this.unsubscribe$),
        );

    readonly isReadyToDisplay$ = this.selectFilterData$.pipe(map(el => !!el));

    constructor(
        private readonly store: Store,
        private readonly shareService: ShareService,
    ) {}

    ngOnInit(): void {
        this.shareService
            .getData()
            .pipe()
            .subscribe(data => {
                if (data === null) {
                    data = [];
                    this.shareService
                        .getDeleteItem()
                        .subscribe((item: FilterItem) => {
                            const itemIndex = data.indexOf(item);
                            data.splice(itemIndex, 1);
                            this.shareService.sendData(data);
                        });
                }
                this.filteredDataSource$.next(data);
            });
    }

    onChecked(value: string, selected: boolean, id: number): void {
        const filterItem = {
            first_filter_key: value,
            id,
        };

        this.filterItemsArray$
            .pipe(take(1), withLatestFrom(this.shareService.getData()))
            .subscribe(([filteredItemsArr, currentData]) => {
                if (filteredItemsArr === null) {
                    filteredItemsArr = [];
                }
                if (selected) {
                    filteredItemsArr.push(filterItem);
                    this.shareService.sendData(filteredItemsArr);
                } else {
                    const itemFromFilteredArray = currentData.find(
                        (item: FilterItem) =>
                            item.first_filter_key ===
                            filterItem.first_filter_key,
                    );
                    const indexOfItem = currentData.indexOf(itemFromFilteredArray);
                    currentData.splice(indexOfItem, 1);
                }
                this.shareService.sendData(filteredItemsArr);
            });
    }

    onInputFirst(id: number, value: string): void {
        this.filterItemFromTo = {
            first_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onInputSecond(id: number, value: string): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            second_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onSelectFirst(id: number, value: string): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            first_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onSelectSecond(id: number, value: string): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            second_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onFilterFromTo(filterFromTo: FilterItem): void {
        this.filteredData$.pipe(take(1)).subscribe((data: FilterItem[]) => {
            const res = data.find(el => el.id === filterFromTo.id);
            if (res) {
                (res.first_filter_key = filterFromTo.first_filter_key),
                    (res.second_filter_key = filterFromTo.second_filter_key);
            } else {
                data.push(filterFromTo);
            }
            this.removeFromTo();
            this.shareService.sendData(data);
        });
    }

    removeFromTo(): void {
        this.filterItemsArray$.pipe(take(1)).subscribe((data: FilterItem[]) => {
            if (data === null) {
                data = [];
            }
            const filteredFrom = data.find(
                item =>
                    item.first_filter_key === '' ||
                    item.first_filter_key === undefined,
            );
            const filteredTo = data.find(
                item =>
                    item.second_filter_key === '' ||
                    item.second_filter_key === undefined,
            );

            const filteredIndexFrom = data.indexOf(filteredFrom);
            const filteredIndexTo = data.indexOf(filteredTo);

            if (filteredIndexFrom > -1 && filteredIndexTo > -1) {
                data.splice(filteredIndexFrom, 1);
                data.splice(filteredIndexTo, 1);
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.filteredDataSource$.complete();
    }
}
