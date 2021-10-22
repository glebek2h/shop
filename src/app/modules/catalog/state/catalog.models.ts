export interface Offers {
    icon: string;
    _id: number;
    categories: Array<OffersCategories>;
    promos: Array<PromosData>;
    categoryName?: string;
}

export interface OffersCategories {
    categoryNames: Array<CategoryName>;
    data: Array<CategoriesData>;
}

export interface CategoryName {
    name: string;
    _id: string;
}

export interface CategoriesData {
    productName: string;
    image: string;
    quantity: string;
    category: string;
}

export interface PromosData {
    title: string;
    subTitle: string;
    image: string;
    link: string;
    _id: number;
}

export interface APIResponseOffers<T> {
    offers: Array<Offers>;
}

export interface APIResponseCategoryOffers<T> {
    categoryOffers: Array<Offers>;
}

export interface Links {
    text: string;
    link: string;
}

export interface APIResponseLinks<T> {
    links: Array<Links>;
}

export interface PromotionsData {
    title: string;
    subTitle: string;
    image: string;
    link: string;
}

export interface APIResponsePromotions<T> {
    promotions: Array<PromotionsData>;
}
