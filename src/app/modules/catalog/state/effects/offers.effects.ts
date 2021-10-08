import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OffersService } from 'src/app/services/offers-service/offers.service';
import * as OffersActions from '../actions/offers.actions';

@Injectable()
export class OfferEffects {
    getOffers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OffersActions.getOffers),
            switchMap(() =>
                this.offersService
                    .getOffers()
                    .pipe(
                        map(offers => OffersActions.getOffersSuccess(offers)),
                    ),
            ),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly offersService: OffersService,
    ) {}
}
