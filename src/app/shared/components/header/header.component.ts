import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    control = new FormControl();
    searchedResults = [
        'Champs-Élysées',
        'Lombard Street',
        'Abbey Road',
        'Fifth Avenue',
    ];
    readonly filteredResults$ = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this.filter(value)),
        takeUntil(this.unsubscribe$),
    );

    constructor() {}

    ngOnInit(): void {}

    private filter(value: string): string[] {
        const filterValue = this.normalizeValue(value);
        return this.searchedResults.filter(street =>
            this.normalizeValue(street).includes(filterValue),
        );
    }

    private normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, '');
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
