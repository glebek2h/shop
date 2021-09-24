export interface Admin {
    name: string;
    email: string;
    avatar: string;
}

export interface UpdatedProfile {
    name: string;
    email: string;
}

export interface RemoveProfileAvatar {
    avatar: null;
}

export interface UpdateProfileAvatar {
    avatar: string;
}
