import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { temporaryImgUrl } from 'src/app/shared/utils/utils';
import * as OrdersActions from '../actions/orders.actions';

@Injectable()
export class OrdersEffects {
    getOrders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OrdersActions.getOrders),
            switchMap(() =>
                of({
                    items: [
                        {
                            orderNumber: 111,
                            orderingTime: '7 february 2020 14:20',
                            shopName: 'Aliexpress',
                            shopLink: '#shop',
                            sellerLink: '#seller',
                            total: 200,
                            orderItems: [
                                {
                                    imgUrl: temporaryImgUrl,
                                    description: 't-sirt',
                                    price: 100,
                                },
                                {
                                    imgUrl: temporaryImgUrl,
                                    description: 'jeans',
                                    price: 100,
                                },
                            ],
                        },
                        {
                            orderNumber: 222,
                            orderingTime: '12 september 2020 15:00',
                            shopName: 'Aliexpress',
                            shopLink: '#shop',
                            sellerLink: '#seller',
                            total: 400,
                            orderItems: [
                                {
                                    imgUrl: temporaryImgUrl,
                                    description: 'sneakers',
                                    price: 200,
                                },
                                {
                                    imgUrl: temporaryImgUrl,
                                    description: 'lamp',
                                    price: 200,
                                },
                            ],
                        },
                    ],
                }),
            ),
            map(orders => OrdersActions.getOrdersSuccess({ orders })),
        );
    });

    constructor(private actions$: Actions) {}
}
