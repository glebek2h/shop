import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
    constructor() {}
    hidePromos = true;

    onSay(event: boolean) {
        this.hidePromos = event;
    }

    ngOnInit(): void {}
}
