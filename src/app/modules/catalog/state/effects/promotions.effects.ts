import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PromotionService } from 'src/app/services/promotions-service/promotion.service';
import * as PromotionsActions from '../actions/promotions.actions';

@Injectable()
export class PromotionsEffects {
    getPromotionsData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PromotionsActions.getPromotionsData),
            switchMap(() =>
                this.promotionsService
                    .getPromotions()
                    .pipe(
                        map(promotions => PromotionsActions.getPromotionsDataSuccess(promotions),
                    ),
            ),
        ))
    });

    constructor(
        private readonly actions$: Actions,
        private readonly promotionsService: PromotionService,
    ) {}
}
