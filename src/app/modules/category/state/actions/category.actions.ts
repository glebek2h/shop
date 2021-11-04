import { createAction, props } from '@ngrx/store';
import * as ActionConstants from 'src/app/store/store-action.constants';
import { CategoryProducts } from '../category.models';

export const getCategoryProductsById = createAction(
    ActionConstants.GET_CATEGORY_PRODUCTS,
    (categoryId: string) => ({ categoryId }),
);

export const getCategoryProductsByIdSuccess = createAction(
    ActionConstants.GET_CATEGORY_PRODUCTS_SUCCESS,
    (categoryProducts: CategoryProducts) => ({ categoryProducts }),
);
