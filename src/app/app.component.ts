import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LanguageSwitchService } from './services/language-switch/language-switch.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    showHead: boolean = false;

    constructor(
        private readonly translate: TranslateService,
        private readonly languageSwitchService: LanguageSwitchService,
        private readonly router: Router,
    ) {
        // console.log(this.router.events);
        this.router.events.forEach(event => {
            if (
                event['url'] == '/cart' ||
                event['url'] == '/login' ||
                event['url'] == '/sign-in' ||
                event['url'] == '/error' 
            ) {
                this.showHead = false;
            } else if (
                event['url'] == '/admin/profile' ||
                event['url'] == '/admin/orders'||
                event['url'] == '/admin'
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
