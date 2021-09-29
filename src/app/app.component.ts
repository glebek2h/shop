import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LanguageSwitchService } from './services/language-switch.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        readonly translate: TranslateService,
        readonly languageSwitchService: LanguageSwitchService,
    ) {
        const language = this.languageSwitchService.getLanguage(
            environment.langKey,
        );
        translate.setDefaultLang(environment.defaultLang);
        this.languageSwitchService.switchLanguage(language);
    }

    ngOnInit() {}
}
