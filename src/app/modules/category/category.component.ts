import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddToArray } from './state/category.models';
import * as CategorySelectors from './state/selectors/category.selectors';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    array: AddToArray[];

    readonly categoryProductTitle$ = this.store
        .select(CategorySelectors.selectCategoryTitle)
        .pipe(takeUntil(this.unsubscribe$));

    constructor(private readonly store: Store) {}

    ngOnInit(): void {}

    getArrayItems(array: AddToArray[]): void {
        this.array = array;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
