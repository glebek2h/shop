import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as constants from './app-routing.constants';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminModule } from './modules/admin/admin.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
    {
        path: constants.PROFILE,
        component: AdminComponent,
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
