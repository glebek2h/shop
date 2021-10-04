import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LanguageSwitchService {
    constructor(private translate: TranslateService) {}

    public switchLanguage(lang: string): void {
        this.setLanguage(lang);
        this.translate.use(lang);
    }

    private setLanguage(value: string): void {
        window.localStorage.setItem(environment.langKey, JSON.stringify(value));
    }

    public getLanguage(): string {
        const data = window.localStorage.getItem(environment.langKey);
        return data !== null ? JSON.parse(data) : environment.defaultLang;
    }
}
