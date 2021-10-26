import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
    hidePromos = true;

    constructor() {}

    onHide(hidePromo: boolean) {
        this.hidePromos = hidePromo;
    }

    ngOnInit(): void {}
}
