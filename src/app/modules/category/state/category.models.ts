export interface CategoryProducts {
    _id: string;
    data: Array<CategoryProductData>;
    categoryTitle: string;
    categoryId: number;
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
