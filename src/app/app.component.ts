import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private readonly http: HttpClient) {}
    onClick() {
        this.http.post('http://localhost:3000/api/posts', {
            title: '1',
            content: 'some content 1',
        }).subscribe(console.log);
    }
}
