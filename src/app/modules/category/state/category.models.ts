export interface CategoryProducts {
    _id: string;
    data: Array<CategoryProductData>;
    categoryTitle: string;
    categoryId: number;
    filter: Array<FilterData>;
}

export interface FilterData {
    filter_title: string;
    filters: Array<string>;
    selectItems: Array<string>;
    type: number;
}

export interface AddToArray {
    first_filter_key: string
    second_filter_key?: string
    id: number
}

// export interface AddToArray {
//     name: string
//     id: number
// }

// export interface AddFromToArray {
//     from: string
//     to: string
//     id: number
// }

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
