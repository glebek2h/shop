export interface Admin {
    name: string;
    email: string;
    avatar: string;
}

export interface UpdatedProfile {
    name: string;
    email: string;
}

export interface NoDataResponce  {
    success: boolean;
    message: string;
}


export interface RemoveProfileAvatarResponse extends NoDataResponce {}
export interface UploadProfileAvatarResponse extends NoDataResponce {}