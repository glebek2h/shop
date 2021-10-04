import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from 'src/app/services/language-switch/language-switch.service';

interface Language {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
    constructor(private languageSwitchService: LanguageSwitchService) {}

    languages: Language[] = [
        { value: 'en', viewValue: 'LANGUAGE.ENG' },
        { value: 'ru', viewValue: 'LANGUAGE.RU' },
    ];

    changeLanguage(value: string): void {
        this.languageSwitchService.switchLanguage(value);
    }

    ngOnInit(): void {}
}
