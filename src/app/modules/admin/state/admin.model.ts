import { OrdersState } from './admin.state';

export interface Admin {
    _id: string;
    name: string;
    email: string;
    avatar: string;
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

export interface APIResponseOrders<T> {
    orders: Array<Orders>;
}
export interface APIResponseProfile<T> {
    profile: Admin;
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
    success: boolean;
    message: string;
}

export interface MessageResponse {
    message: string;
}

export interface RemoveProfileAvatarResponse extends NoDataResponse {}
export interface UploadProfileAvatarResponse extends NoDataResponse {}
export interface OrdersData extends OrdersState {}
