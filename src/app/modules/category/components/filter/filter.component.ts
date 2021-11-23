import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, zip } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
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
        private readonly elRef: ElementRef,
    ) {}

    ngOnInit(): void {
        zip(
            this.shareService.getData(),
            this.shareService.getDeleteItem(),
        ).subscribe(([data, deletedItem]) => {
            if (data === null) {
                data = [];
            }
            const itemIndex = data.indexOf(deletedItem);
            data.splice(itemIndex, 1);
            this.shareService.sendData(data);
        });
    }

    onChecked(value: FiltersData, selected: boolean, id: string): void {
        const filterItem = {
            first_filter_key: value,
            id,
        };

        this.selectedItemsArray$.pipe(take(1)).subscribe(filteredItemsArr => {
            if (!filteredItemsArr) {
                filteredItemsArr = [];
            }
            if (selected) {
                filteredItemsArr.push(filterItem);
                this.shareService.sendData(filteredItemsArr);
            } else {
                const itemFromFilteredArray = filteredItemsArr.find(
                    item => item.id === filterItem.id,
                );
                const indexItem = filteredItemsArr.indexOf(
                    itemFromFilteredArray,
                );
                filteredItemsArr.splice(indexItem, 1);
            }
            this.shareService.sendData(filteredItemsArr);
        });
    }

    onInput(id: string): void {
        const inputsElements =
            this.elRef.nativeElement.querySelectorAll('.input');

        const filterItem: FilterItem = {
            id,
            first_filter_key: null,
            second_filter_key: null,
        };

        inputsElements.forEach(input => {
            filterItem[input.getAttribute('key')] = input.value;
        });

        this.onFilterFromTo(filterItem);
    }

    onSelectFirst(id: string, value: FiltersData): void {
        this.filterItemFromTo = {
            id,
            ...this.filterItemFromTo,
            first_filter_key: value,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onSelectSecond(id: string, value: FiltersData): void {
        this.filterItemFromTo = {
            id,
            ...this.filterItemFromTo,
            second_filter_key: value,
        };
        this.onFilterFromTo(this.filterItemFromTo);
    }

    onFilterFromTo(filterFromTo: FilterItem): void {
        this.selectedItemsArray$.pipe(take(1)).subscribe(data => {
            const resultItem = data.find(el => el.id === filterFromTo.id);
            if (resultItem) {
                (resultItem.first_filter_key = filterFromTo.first_filter_key),
                    (resultItem.second_filter_key =
                        filterFromTo.second_filter_key);
            } else {
                data.push(filterFromTo);
            }
            this.removeFromTo();
            this.shareService.sendData(data);
        });
    }

    removeFromTo(): void {
        let filteredArray: FilterItem[];
        this.selectedItemsArray$.pipe(take(1)).subscribe(data => {
            if (data === null) {
                data = [];
            }
            const emptyElement = data.find(el => {
                if (
                    (el.first_filter_key === '' &&
                        el.second_filter_key === '') ||
                    (el.first_filter_key === '' &&
                        el.second_filter_key === undefined) ||
                    (el.first_filter_key === undefined &&
                        el.second_filter_key === '')
                ) {
                    return el;
                }
            });

            const emptyElementIndex = data.findIndex(el =>
                emptyElement ? el.id === emptyElement.id : '',
            );

            if (emptyElementIndex > -1) {
                filteredArray = data.splice(emptyElementIndex, 1);
                this.shareService.sendData(filteredArray);
            }
        });
    }

    setFilterValue(id: string, selectedItems: FilterItem[]): boolean {
        return (
            selectedItems.findIndex(el =>
                el.first_filter_key !== undefined
                    ? el.first_filter_key.id === id
                    : '',
            ) > -1
        );
    }

    resetInputValue(
        id: string,
        selectedItems: FilterItem[],
        filterKey: string,
    ): FiltersData {
        const resultItem = selectedItems.find(el => el.id === id);
        return selectedItems.length && resultItem ? resultItem[filterKey] : '';
    }

    resetSelectValue(
        filterKey: string,
        selectedItems: FilterItem[],
        name: string,
    ): FiltersData {
        const resultItem = selectedItems.find(el => el[filterKey] === name);
        return selectedItems.length && resultItem ? resultItem[filterKey] : '';
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
