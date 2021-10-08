export interface Offers {
    icon: string;
    text: string;
}

export interface APIResponseOffers<T> {
    offers: Array<Offers>;
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
