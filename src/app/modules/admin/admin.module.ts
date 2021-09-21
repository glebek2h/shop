import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileNavigationComponent } from './components/profile-navigation/profile-navigation.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    declarations: [
        AdminComponent,
        ProfileHeaderComponent,
        ProfileNavigationComponent,
        ProfileContentComponent,
    ],
    imports: [FormsModule, CommonModule, AdminRoutingModule, MatIconModule, MatExpansionModule],
})
export class AdminModule {}
