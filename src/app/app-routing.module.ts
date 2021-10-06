import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as constants from './app-routing.constants';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminModule } from './modules/admin/admin.module';
import { OrdersComponent } from './modules/admin/components/orders/orders.component';
import { ProfileContentComponent } from './modules/admin/components/profile-content/profile-content.component';
import { CartComponent } from './modules/cart/cart.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
    {
        path: `${constants.ADMIN}`,
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: `${constants.PROFILE}`,
                pathMatch: 'full',
            },
            {
                path: `${constants.PROFILE}`,
                component: ProfileContentComponent,
            },
            {
                path: `${constants.ORDERS}`,
                component: OrdersComponent,
            },
            {
                path: '**',
                redirectTo: `${constants.PROFILE}`,
                pathMatch: 'full',
            },
        ],
    },
    {
        path: constants.LOGIN,
        component: LoginComponent
    },
    {
        path: `${constants.SIGN_IN}`,
        component: SignInComponent,
    },
    {
        path: `${constants.CART}`,
        component: CartComponent,
    },
    {
        path: constants.ERROR_PAGE,
        component: ErrorPageComponent,
    },
    {
        path: '**',
        redirectTo: constants.ERROR_PAGE,
    },
];

@NgModule({
    imports: [AdminModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
