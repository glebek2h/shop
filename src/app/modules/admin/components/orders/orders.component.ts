import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrdersServerService } from 'src/app/services/orders-service/orders-server.service';
import * as OrdersActions from '../../state/actions/orders.actions';
import { AdminState } from '../../state/admin.state';
import * as OrdersSelect from '../../state/selectors/orders.selectors';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    readonly getOrders$ = this.store
        .select(OrdersSelect.selectState)
        .pipe(takeUntil(this.unsubscribe$));

    constructor(
        readonly store: Store<AdminState>,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(OrdersActions.getOrders());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
