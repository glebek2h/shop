import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseOrders, MessageResponse, Orders } from 'src/app/modules/admin/state/admin.model';
import { environment } from 'src/environments/environment';
import * as serviceConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class OrdersServerService {
    constructor(private readonly http: HttpClient) {}

    getOrders(): Observable<APIResponseOrders<Orders>> {
        return this.http.get<APIResponseOrders<Orders>>(
            `${environment.api_url}${serviceConstants.orders}`,
        );
    }

    deleteOrder(id: string) {
        return this.http.delete(
            `${environment.api_url}${serviceConstants.orders}/${id}`,
        )
    }
}