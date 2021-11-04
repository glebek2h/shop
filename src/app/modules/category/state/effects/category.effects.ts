import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import * as CategoryActions from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
    getCategoryProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.getCategoryProductsById),
            switchMap(({ categoryId }) =>
                this.categoryService
                    .getCategoryProducts(categoryId)
                    .pipe(
                        map(({ categoryProducts }) =>
                            CategoryActions.getCategoryProductsByIdSuccess(
                                categoryProducts,
                            ),
                        ),
                    ),
            ),
        );
    });

    constructor(
        private readonly categoryService: CategoryService,
        private readonly actions$: Actions,
    ) {}
}
