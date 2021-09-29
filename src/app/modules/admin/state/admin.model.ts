import { OrdersState } from './admin.state';

export interface Admin {
    name: string;
    email: string;
    avatar: string;
}

export interface Orders {
    id: number,
    orderNumber: number;
    orderingTime: string;
    shopName: string;
    shopLink: string;
    sellerLink: string;
    total: number;
    orderItems: Array<OrderItems>;
}

export interface APIResponse<T> {
    orders: Array<Orders>
  }

export interface OrderItems {
    imgUrl: string;
    description: string;
    price: number;
}

export interface UpdatedProfile {
    name: string;
    email: string;
}

export interface NoDataResponce {
    success: boolean;
    message: string;
}

export interface RemoveProfileAvatarResponse extends NoDataResponce {}
export interface UploadProfileAvatarResponse extends NoDataResponce {}
export interface OrdersData extends OrdersState {}
