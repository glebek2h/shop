import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../../state/actions/orders.actions';
import { AdminState } from '../../state/admin.state';
import * as OrdersSelect from '../../state/selectors/orders.selectors';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
    readonly getOrders$ = this.store.select(OrdersSelect.selectState);

    constructor(private store: Store<AdminState>) {}

    ngOnInit(): void {
        this.store.dispatch(OrdersActions.getOrders());
    }
}
