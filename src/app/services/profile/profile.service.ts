import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Admin,
    APIResponseProfile,
} from 'src/app/modules/admin/state/admin.model';
import { environment } from 'src/environments/environment';
import * as serverConstants from '../service.constants';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private readonly http: HttpClient) {}

    getProfileInfo(): Observable<APIResponseProfile<Admin>> {
        return this.http.get<APIResponseProfile<Admin>>(
            `${environment.api_url}${serverConstants.profile}`,
        );
    }

    updateProfileInfo(data: Admin): Observable<Admin> {
        return this.http.put<Admin>(
            `${environment.api_url}${serverConstants.profile}`,
            {
                _id: data._id,
                name: data.name,
                email: data.email,
                avatar: data.avatar,
            },
        );
    }
}
