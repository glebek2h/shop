import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrdersServerService } from 'src/app/services/orders-service/orders-server.service';
import * as OrdersActions from '../actions/orders.actions';

@Injectable()
export class OrdersEffects {
    getOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OrdersActions.getOrders),
            switchMap(() =>
                this.ordersServerService
                    .getOrders()
                    .pipe(
                        map(orders => OrdersActions.getOrdersSuccess(orders)),
                    ),
            ),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly ordersServerService: OrdersServerService,
    ) {}
}
