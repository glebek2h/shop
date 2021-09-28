import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-navigation',
    templateUrl: './profile-navigation.component.html',
    styleUrls: ['./profile-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileNavigationComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
