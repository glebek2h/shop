import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
    effectName$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AdminActions.loadAdminInfo),
            switchMap(() =>
                of({
                    type: null,
                    name: 'Seva',
                    email: 'seva@exade.com',
                    avatar: 'asdasdasdasdasd',
                }),
            ),
        );
    });

    constructor(private actions$: Actions) {}
}
