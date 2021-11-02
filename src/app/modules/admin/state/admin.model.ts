import { OrdersState } from './admin.state';

export interface Admin {
    _id: string;
    name: string;
    email: string;
}

export interface Avatar {
    imgUrl: string;
    _id: string;
}

export interface Orders {
    _id: string;
    orderNumber: string;
    orderingTime: string;
    shopName: string;
    shopLink: string;
    sellerLink: string;
    total: number;
    orderItems: Array<OrderItems>;
}

export interface APIResponseOrders {
    orders: Array<Orders>;
}
export interface APIResponseProfile {
    profile: Admin;
}
export interface APIResponseAvatar {
    avatar: Avatar;
}

export interface SelectOrders {
    orders: Array<Orders>;
}

export interface OrderItems {
    imgUrl: string;
    description: string;
    price: number;
}

export interface NoDataResponse {
    message: string;
}

export interface RemoveProfileAvatarResponse extends NoDataResponse {}
export interface UploadProfileAvatarResponse extends NoDataResponse {}
export interface OrdersData extends OrdersState {}
