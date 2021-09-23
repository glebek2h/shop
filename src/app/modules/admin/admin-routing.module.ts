import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ORDERS, PROFILE, ADMIN } from 'src/app/app-routing.constants';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: `${ADMIN}/${PROFILE}`,
        component: AdminComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
