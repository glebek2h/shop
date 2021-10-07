import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
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
    showHeader: boolean | Promise<void>;

    constructor(
        readonly translate: TranslateService,
        private readonly languageSwitchService: LanguageSwitchService,
        private readonly router: Router,
    ) {
        this.showHeader = this.router.events.forEach(({url}: RouterEvent) => {
            if (
                url === `/${routingConstants.CART}` ||
                url === `/${routingConstants.LOGIN}` ||
                url === `/${routingConstants.CART}` ||
                url === `/${routingConstants.ERROR_PAGE}` 
            ) {
                this.showHeader = false;
            } else if (
                url === `/${routingConstants.ADMIN}/${routingConstants.PROFILE}` ||
                url === `/${routingConstants.ADMIN}/${routingConstants.ORDERS}`||
                url === `/${routingConstants.ADMIN}` ||
                url === `/${routingConstants.CATALOG}`
            ) {
                this.showHeader = true;
            }
        });
    }

    ngOnInit() {
        const language = this.languageSwitchService.getLanguage();
        this.translate.setDefaultLang(environment.defaultLang);
        this.languageSwitchService.switchLanguage(language);
    }
}
