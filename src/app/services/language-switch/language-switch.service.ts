import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LanguageSwitchService {
    constructor(readonly translate: TranslateService) {}

    switchLanguage(lang: string) {
        this.setLanguage(environment.langKey, lang);
        this.translate.use(lang);
    }

    setLanguage(key: string, value: string) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getLanguage(key: string) {
        const data = window.localStorage.getItem(key);
        return data !== null ? JSON.parse(data) : environment.defaultLang;
    }
}
