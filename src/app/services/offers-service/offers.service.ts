import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    APIResponseCategoryOffers,
    APIResponseOffers,
    Offers,
} from 'src/app/modules/catalog/state/catalog.models';
import { environment } from 'src/environments/environment';
import * as serviceConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class OffersService {
    constructor(private readonly http: HttpClient) {}

    getOffers(): Observable<APIResponseOffers<Offers>> {
        return this.http.get<APIResponseOffers<Offers>>(
            `${environment.api_url}${serviceConstants.offers}`,
        );
    }

    getOffersCategory(): Observable<APIResponseCategoryOffers<Offers>> {
        return this.http.get<APIResponseCategoryOffers<Offers>>(
            `${environment.api_url}${serviceConstants.offersCategory}`,
        )
    }
}
