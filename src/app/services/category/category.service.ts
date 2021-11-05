import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProductsResponse } from 'src/app/modules/category/state/category.models';
import { environment } from 'src/environments/environment';
import * as constants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private readonly http: HttpClient) {}

    getCategoryProducts(id: string): Observable<CategoryProductsResponse> {
        return this.http.get<CategoryProductsResponse>(
            `${environment.api_url}${constants.category}/${id}`,
        );
    }
}
