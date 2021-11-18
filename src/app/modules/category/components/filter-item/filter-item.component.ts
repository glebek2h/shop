import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShareService } from 'src/app/services/share/share.service';
import { FilterItem } from '../../state/category.models';

@Component({
    selector: 'app-filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterItemComponent {
    dataItems$ = this.shareService.getData();

    constructor(private readonly shareService: ShareService) {}

    removeOne(item: FilterItem): void {
        this.shareService.sendDeleteItem(item);
    }
}
