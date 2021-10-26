import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/utils';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [LanguageSwitcherComponent, HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatIconModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    exports: [LanguageSwitcherComponent, MatSelectModule, HeaderComponent, FooterComponent],
})
export class SharedModule {}
