import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';
import { CategoryProductsState } from '../category.state';

export const categoryFeatureKey = 'category-products';

export const initialState: CategoryProductsState = {
    products: {
        _id: null,
        categoryId: null,
        categoryTitle: null,
        data: [],
    },
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
