import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    APIResponsePromotions,
    PromotionsData,
} from 'src/app/modules/catalog/state/catalog.models';
import { environment } from 'src/environments/environment';
import * as serviceConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class PromotionService {
    constructor(private readonly http: HttpClient) {}

    getPromotions(): Observable<APIResponsePromotions<PromotionsData>> {
        return this.http.get<APIResponsePromotions<PromotionsData>>(
            `${environment.api_url}${serviceConstants.promotions}`,
        );
    }
}
