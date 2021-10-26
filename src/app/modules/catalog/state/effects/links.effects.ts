import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { LinksService } from 'src/app/services/links-service/links.service';
import * as LinkActions from '../actions/links.actions';

@Injectable()
export class LinksEffects {
    getLinks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LinkActions.getLinks),
            switchMap(() =>
                this.linksService
                    .getLinks()
                    .pipe(map(links => LinkActions.getLinksSuccess(links))),
            ),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly linksService: LinksService,
    ) {}
}
