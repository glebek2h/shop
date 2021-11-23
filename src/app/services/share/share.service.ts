import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterItem } from 'src/app/modules/category/state/category.models';

@Injectable({
    providedIn: 'root',
})
export class ShareService {
    private subject = new BehaviorSubject(null);
    private deletedSubject = new BehaviorSubject(null);
    constructor() {}

    sendData(data: FilterItem[]) {
        this.subject.next(data);
    }

    getData(): Observable<FilterItem[]> {
        return this.subject.asObservable();
    }

    sendDeleteItem(item: FilterItem) {
        return this.deletedSubject.next(item);
    }
    
    getDeleteItem(): Observable<FilterItem> {
        return this.deletedSubject.asObservable()
    }
}
