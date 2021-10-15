import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
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
import { selectedTab, selectedTabChanged } from '../../catalog.constants';

@Component({
    selector: 'app-super-offers',
    templateUrl: './super-offers.component.html',
    styleUrls: ['./super-offers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperOffersComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tabGroup') tabGroup: {
        _tabBodyWrapper: { nativeElement: string };
    };
    private readonly unsubscribe$ = new Subject();
    private element: { nativeElement: string };

    readonly offers$ = this.store
        .select(OffersSelectors.selectOffers)
        .pipe(takeUntil(this.unsubscribe$));

    readonly isReadyToDisplay$ = this.offers$.pipe(
        map(el => !!el),
        takeUntil(this.unsubscribe$),
    );

    constructor(
        private readonly store: Store<CatalogState>,
        private readonly renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(OffersActions.getOffers());
    }

    ngAfterViewInit(): void {
        this.element = this.tabGroup._tabBodyWrapper;
    }

    addClass(className: string, element: { nativeElement: string }) {
        this.renderer.addClass(element.nativeElement, className);
    }

    removeClass(className: string, element: { nativeElement: string }) {
        this.renderer.removeClass(element.nativeElement, className);
    }

    onTabChange(event: { target: { classList: { value: string } } }) {
        const eventTarget = event.target.classList.value;

        if (eventTarget === selectedTab || eventTarget === selectedTabChanged) {
            this.addClass('active', this.element);
        } else {
            this.removeClass('active', this.element);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
