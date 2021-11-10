import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShareService } from 'src/app/services/share/share.service';
import { AddToArray } from '../../state/category.models';

@Component({
    selector: 'app-filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterItemComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    constructor(private readonly shareService: ShareService) {}

    readonly dataItemsSource$ = new BehaviorSubject<AddToArray[]>(null);

    readonly dataItems$ = this.dataItemsSource$.asObservable();

    ngOnInit(): void {
        this.shareService.getData().subscribe(data => {
            this.dataItemsSource$.next(data);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.dataItemsSource$.complete();
    }
}
