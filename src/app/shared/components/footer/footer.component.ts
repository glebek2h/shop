import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    footerLinks = [
        {
            text: 'FOOTER.ABOUT',
            link: 'https://blog.onliner.by/about',
        },
        {
            text: 'FOOTER.EDITORIAL_CONTACTS',
            link: 'https://people.onliner.by/contacts',
        },
        {
            text: 'FOOTER.ADS',
            link: 'https://b2breg.onliner.by/advertising',
        },
        {
            text: 'FOOTER.LISTING',
            link: 'https://docs.google.com/spreadsheets/d/1SGFaTkV_Ru4vI29ml9yvR-dMz9rOl7DVVpKk64w5lqM/edit#gid=372016392',
        },
        {
            text: 'FOOTER.VACANCIES',
            link: 'https://blog.onliner.by/vacancy',
        },
        {
            text: 'FOOTER.MANIFEST',
            link: 'https://blog.onliner.by/manifest',
        },
        {
            text: 'FOOTER.USER_AGREEMENT',
            link: 'https://blog.onliner.by/siterules',
        },
        {
            text: 'FOOTER.PUBLIC_CONTRACTS',
            link: 'https://blog.onliner.by/publichnye-dogovory',
        },
        {
            text: 'FOOTER.PRIVACY_POLICY',
            link: 'https://blog.onliner.by/politika-konfidencialnosti',
        },
        {
            text: 'FOOTER.USER_SUPPORT',
            link: 'https://support.onliner.by',
        },
        {
            text: 'FOOTER.RETURN_POLICY',
            link: 'https://blog.onliner.by/pravila-vozvrata-tovarov-i-deneg',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
