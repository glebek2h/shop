import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/shared/utils/utils';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CatalogRoutingModule } from './catalog-routing.module';

@NgModule({
    declarations: [CatalogComponent],
    imports: [
        CommonModule,
        MatIconModule,
        CatalogRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    exports: [CatalogComponent],
})
export class CatalogModule {}
