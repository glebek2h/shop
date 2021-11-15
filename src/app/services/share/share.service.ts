import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShareService {
    private subject = new BehaviorSubject(null);
    private deletedSubject = new BehaviorSubject(null);
    constructor() {}

    sendData(data: any) {
        this.subject.next(data);
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    sendDeleteItem(item: any) {
        return this.deletedSubject.next(item);
    }
    
    getDeleteItem(): Observable<any> {
        return this.deletedSubject.asObservable()
    }
}
