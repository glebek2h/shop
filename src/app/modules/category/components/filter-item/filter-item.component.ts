import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareService } from 'src/app/services/share/share.service';
import { FilterItem } from '../../state/category.models';

@Component({
    selector: 'app-filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterItemComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    dataItems$ = this.shareService.getData().pipe(takeUntil(this.unsubscribe$));

    constructor(private readonly shareService: ShareService) {}

    ngOnInit(): void {}

    removeOne(item: FilterItem): void {
        this.shareService.sendDeleteItem(item)
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
