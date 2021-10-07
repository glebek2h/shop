import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/shared/utils/utils';
import { HttpClient } from '@angular/common/http';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
})
export class CartModule {}
