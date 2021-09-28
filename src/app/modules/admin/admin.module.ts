import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileNavigationComponent } from './components/profile-navigation/profile-navigation.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './state/reducers/admin.reducer';
import * as fromOrders from './state/reducers/orders.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/effects/admin.effects';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersEffects } from './state/effects/orders.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/shared/utils/utils';

@NgModule({
    declarations: [
        AdminComponent,
        ProfileHeaderComponent,
        ProfileNavigationComponent,
        ProfileContentComponent,
        OrdersComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AdminRoutingModule,
        MatIconModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducer),
        StoreModule.forFeature(fromOrders.ordersFeatureKey, fromOrders.reducer),
        EffectsModule.forFeature([AdminEffects, OrdersEffects]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
})
export class AdminModule {}
