import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PROFILE, ROOT_PATH } from 'src/app/app-routing.constants';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToProfile() {
        this.router.navigate([`/${PROFILE}`]);
    }
}
