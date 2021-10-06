import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as routingConstants from './app-routing.constants';
import { LanguageSwitchService } from './services/language-switch/language-switch.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    showHead = false;

    constructor(
        readonly translate: TranslateService,
        private readonly languageSwitchService: LanguageSwitchService,
        private readonly router: Router,
    ) {
        this.router.events.forEach(event => {
            if (
                event['url'] == `/${routingConstants.CART}` ||
                event['url'] == `/${routingConstants.LOGIN}` ||
                event['url'] == `/${routingConstants.CART}` ||
                event['url'] == `/${routingConstants.ERROR_PAGE}` 
            ) {
                this.showHead = false;
            } else if (
                event['url'] == `/${routingConstants.ADMIN}/${routingConstants.PROFILE}` ||
                event['url'] == `/${routingConstants.ADMIN}/${routingConstants.ORDERS}`||
                event['url'] == `/${routingConstants.ADMIN}` ||
                event['url'] == `/${routingConstants.CATALOG}`
            ) {
                this.showHead = true;
            }
        });
    }

    ngOnInit() {
        const language = this.languageSwitchService.getLanguage();
        this.translate.setDefaultLang(environment.defaultLang);
        this.languageSwitchService.switchLanguage(language);
    }
}
