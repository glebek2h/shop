import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share/share.service';
import { AddToArray } from '../../state/category.models';
import * as CategorySelectors from '../../state/selectors/category.selectors';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    array: AddToArray[] = [];
    private filterItem: AddToArray;
    inputValue1 = '';
    inputValue2 = '';
    selectValue1 = '';
    selectValue2 = '';

    readonly selectFilterData$ = this.store
        .select(CategorySelectors.selectFilterData)
        .pipe(
            filter(el => el !== undefined),
            map(el => el),
            takeUntil(this.unsubscribe$),
        );

    readonly isReadyToDisplay$ = this.selectFilterData$.pipe(
        map(el => !!el),
        takeUntil(this.unsubscribe$),
    );

    constructor(
        private readonly store: Store,
        private readonly shareService: ShareService,
    ) {}

    ngOnInit(): void {}

    onChecked(value: string, selected: boolean, id: number): void {
        this.filterItem = {
            first_filter_key: value,
            id,
        };
        if (selected) {
            this.array.push(this.filterItem);
        } else {
            this.array = this.array.filter(
                el => el.first_filter_key !== this.filterItem.first_filter_key,
            );
        }
        this.shareService.sendData(this.array);
    }

    onInput(id: number): void {
        this.onFilter(id, this.inputValue1, this.inputValue2, null);
    }

    onSelect(id: number): void {
        this.onFilter(id, this.selectValue1, this.selectValue2, '');
    }

    onFilter(id: number, from: string, to: string, value: null | string): void {
        this.filterItem = {
            first_filter_key: from,
            second_filter_key: to,
            id,
        };

        const res = this.array.find(el => el.id === this.filterItem.id);

        if (res) {
            (res.first_filter_key = this.filterItem.first_filter_key),
                (res.second_filter_key = this.filterItem.second_filter_key);
        } else {
            this.array[this.array.length] = this.filterItem;
        }

        const filteredFrom = this.array.find(
            el => el.first_filter_key === value,
        );
        const filteredTo = this.array.find(
            el => el.second_filter_key === value,
        );

        if (filteredFrom && filteredTo) {
            this.array = this.array.filter(
                el =>
                    el.first_filter_key !== this.filterItem.first_filter_key &&
                    el.second_filter_key !== this.filterItem.second_filter_key,
            );
        }
        this.shareService.sendData(this.array);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
