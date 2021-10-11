import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CatalogState } from '../../state/catalog.state';
import * as OffersActions from '../../state/actions/offers.actions';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as OffersSelectors from '../../state/selectors/offers.selectors';
import * as EventEmitter from 'events';

@Component({
    selector: 'app-super-offers',
    templateUrl: './super-offers.component.html',
    styleUrls: ['./super-offers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperOffersComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();
    active = 0;
    el: any

    @ViewChild('tabGroup') tabGroup;

    readonly offers$ = this.store
        .select(OffersSelectors.selectOffers)
        .pipe(takeUntil(this.unsubscribe$));

    readonly isReadyToDisplay$ = this.offers$.pipe(
        map(el => !!el),
        takeUntil(this.unsubscribe$),
    );

    constructor(private readonly store: Store<CatalogState>, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.store.dispatch(OffersActions.getOffers());
    }
    
    ngAfterViewInit(): void {
        this.el = this.tabGroup._tabBodyWrapper;
    }

    addClass(className: string, element: any){
        this.renderer.addClass(element.nativeElement, className);
    }

    removeClass(className: string, element: any) {
        this.renderer.removeClass(element.nativeElement, className);
    }

    onTabChange(el: any) {
        this.addClass('active', this.el)
          
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
