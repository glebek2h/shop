import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
export class FilterItemComponent implements OnDestroy {
    private readonly unsubscribe$ = new Subject();
    readonly dataItems$ = this.shareService.getData().pipe(takeUntil(this.unsubscribe$));

    constructor(private readonly shareService: ShareService) {}

    removeOne(item: FilterItem): void {
        this.shareService.sendDeleteItem(item);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
