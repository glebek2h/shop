import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrdersServerService {
    constructor(readonly http: HttpClient) {}

	getOrders(){
		return this.http.get(`${environment.defaultUrl}/api/orders`).subscribe(res => {
			console.log(res);
		})
	}
}
