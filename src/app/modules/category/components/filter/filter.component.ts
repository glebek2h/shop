import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share/share.service';
import { FilterItem, FiltersData } from '../../state/category.models';
import * as CategorySelectors from '../../state/selectors/category.selectors';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    readonly selectedItemsArray$ = this.shareService.getData();
    private filterItemFromTo: FilterItem;

    readonly filterItemsData$ = this.store
        .select(CategorySelectors.selectFilterData)
        .pipe(
            filter(el => el !== undefined),
            map(el => el),
            takeUntil(this.unsubscribe$),
        );

    readonly isReadyToDisplay$ = this.filterItemsData$.pipe(map(el => !!el));

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
            });
    }

    onChecked(value: string, selected: boolean, id: number): void {
        const filterItem = {
            first_filter_key: value,
            id,
        };

        this.selectedItemsArray$
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
                    const indexItem = currentData.indexOf(
                        itemFromFilteredArray,
                    );
                    currentData.splice(indexItem, 1);
                }
                this.shareService.sendData(currentData);
            });
    }

    onInputFirst(id: number, value: FiltersData): void {
        this.filterItemFromTo = {
            first_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onInputSecond(id: number, value: FiltersData): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            second_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onSelectFirst(id: number, value: FiltersData): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            first_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onSelectSecond(id: number, value: FiltersData): void {
        this.filterItemFromTo = {
            ...this.filterItemFromTo,
            second_filter_key: value,
            id,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onFilterFromTo(filterFromTo: FilterItem): void {
        this.selectedItemsArray$
            .pipe(take(1))
            .subscribe((data: FilterItem[]) => {
                const res = data.find(el => el.id === filterFromTo.id);
                if (res) {
                    (res.first_filter_key = filterFromTo.first_filter_key),
                        (res.second_filter_key =
                            filterFromTo.second_filter_key);
                } else {
                    data.push(filterFromTo);
                }
                this.removeFromTo();
                this.shareService.sendData(data);
            });
    }

    removeFromTo(): void {
        this.selectedItemsArray$
            .pipe(take(1))
            .subscribe((data: FilterItem[]) => {
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

    setFilterValue(id: string, selectedItems: FilterItem[]): boolean {
        return (
            selectedItems.findIndex(
                (el: FilterItem) => el.first_filter_key.id === id,
            ) > -1
        );
    }

    resetInputValue(
        id: number,
        selectedItems: FilterItem[],
        filterKey: string,
    ): FiltersData {
        const resultItem = selectedItems.find((el: FilterItem) => el.id === id);
        return selectedItems.length !== 0 && resultItem
            ? resultItem[filterKey]
            : '';
    }

    resetSelectValue(
        filterItemName: string,
        selectedItems: FilterItem[],
    ): string {
        const resultItem =
            selectedItems.findIndex(
                (el: FilterItem) => el.first_filter_key === filterItemName,
            ) > -1;
        return resultItem ? filterItemName : '';
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
