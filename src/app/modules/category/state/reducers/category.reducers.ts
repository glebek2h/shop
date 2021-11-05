import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';
import { CategoryProductsState } from '../category.state';

export const categoryFeatureKey = 'category-products';

export const initialState: CategoryProductsState = {
    products: null,
};

export const reducer = createReducer(
    initialState,

    on(CategoryActions.getCategoryProductsByIdSuccess, (state, action) => {
        return {
            ...state,
            products: action.categoryProducts,
        };
    }),
);
