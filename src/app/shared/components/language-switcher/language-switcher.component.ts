import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from 'src/app/services/language-switch.service';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
    constructor(readonly languageSwitchService: LanguageSwitchService) {}

    foods: Food[] = [
        { value: 'en', viewValue: 'en' },
        { value: 'ru', viewValue: 'ru' },
    ];

    changeLanguage(event: { target: { innerText: string } }) {
        const value = event.target.innerText;
        this.languageSwitchService.switchLanguage(value);
    }

    ngOnInit(): void {}
}
