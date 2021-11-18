export interface CategoryProducts {
    _id: string;
    data: Array<CategoryProductData>;
    categoryTitle: string;
    categoryId: number;
    filter: Array<FilterData>;
}

export interface FilterData {
    filter_title: string;
    filters: Array<FiltersData>;
    selectItems: Array<FiltersData>;
    type: number;
}

export interface FiltersData {
    name?: string;
    id?: string;
}

export interface FilterItem {
    first_filter_key: FiltersData;
    second_filter_key?: FiltersData;
    id: number;
}

export interface CategoryProductsResponse {
    categoryProducts: CategoryProducts;
}

export interface CategoryProductData {
    name: string;
    description: string;
    image: string;
    price: number;
    reviews: number;
    brand: string;
    popular: number;
    releaseDate: number;
    productType: string;
    category: string;
}
