import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/utils';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [LanguageSwitcherComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    exports: [LanguageSwitcherComponent, MatSelectModule],
})
export class SharedModule {}
