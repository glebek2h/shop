import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/shared/utils/utils';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    exports: [CartComponent],
})
export class CartModule {}
