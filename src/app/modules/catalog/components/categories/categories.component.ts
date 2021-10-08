import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as catalogConstants from '../../catalog.constants';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
    categories = [
        {
            img: catalogConstants.mobileIconPath,
            categoryName: catalogConstants.categoryElectronics,
        },
        {
            img: catalogConstants.laptopIconPath,
            categoryName: catalogConstants.categoryLaptops,
        },
        {
            img: catalogConstants.washerIconPath,
            categoryName: catalogConstants.categoryTechniques,
        },
        {
            img: catalogConstants.rollerIconPath,
            categoryName: catalogConstants.categoryRepair,
        },
        {
            img: catalogConstants.homeIconPath,
            categoryName: catalogConstants.categoryHome,
        },
        {
            img: catalogConstants.carIconPath,
            categoryName: catalogConstants.categoryCar,
        },
        {
            img: catalogConstants.bicycleIconPath,
            categoryName: catalogConstants.categorySport,
        },
        {
            img: catalogConstants.strollerIconPath,
            categoryName: catalogConstants.categoryChildren,
        },
        {
            img: catalogConstants.chairIconPath,
            categoryName: catalogConstants.categoryOffice,
        },
        {
            img: catalogConstants.dishIconPath,
            categoryName: catalogConstants.categoryFood,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
