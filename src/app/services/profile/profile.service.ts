import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Admin,
    APIResponseAvatar,
    APIResponseProfile,
    Avatar,
} from 'src/app/modules/admin/state/admin.model';
import { environment } from 'src/environments/environment';
import * as serverConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private readonly http: HttpClient) {}

    getProfileInfo(): Observable<APIResponseProfile> {
        return this.http.get<APIResponseProfile>(
            `${environment.api_url}${serverConstants.profile}`,
        );
    }

    getProfileAvatar(): Observable<APIResponseAvatar> {
        return this.http.get<APIResponseAvatar>(
            `${environment.api_url}${serverConstants.avatar}`,
        );
    }

    updateProfileInfo(data: Admin): Observable<Admin> {
        return this.http.put<Admin>(
            `${environment.api_url}${serverConstants.profile}`,
            {
                _id: data._id,
                name: data.name,
                email: data.email,
            },
        );
    }

    updateProfileAvatar(data: Avatar): Observable<Avatar> {
        return this.http.put<Avatar>(
            `${environment.api_url}${serverConstants.avatar}`,
            {
                _id: data._id,
                imgUrl: data.imgUrl,
            },
        );
    }

    addAvatar(data: Avatar): Observable<Avatar> {
        return this.http.post<Avatar>(
            `${environment.api_url}${serverConstants.avatar}`,
            {
                imgUrl: data.imgUrl,
                _id: data._id,
            },
        );
    }

    deleteAvatar(avatarId: string): Observable<string> {
        return this.http.delete<string>(
            `${environment.api_url}${serverConstants.avatar}/${avatarId}`,
        );
    }
}
