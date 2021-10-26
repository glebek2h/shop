import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    APIResponseLinks,
    Links,
} from 'src/app/modules/catalog/state/catalog.models';
import { environment } from 'src/environments/environment';
import * as serviceConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class LinksService {
    constructor(private readonly http: HttpClient) {}

    getLinks(): Observable<APIResponseLinks<Links>> {
        return this.http.get<APIResponseLinks<Links>>(
            `${environment.api_url}${serviceConstants.links}`,
        );
    }
}
