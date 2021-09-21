import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PROFILE } from 'src/app/app-routing.constants';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: PROFILE,
        component: AdminComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
