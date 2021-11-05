import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as CategorySelectors from './state/selectors/category.selectors';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    readonly categoryProductTitle$ = this.store
        .select(CategorySelectors.selectCategoryTitle)
        .pipe(takeUntil(this.unsubscribe$));

    constructor(private readonly store: Store) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
