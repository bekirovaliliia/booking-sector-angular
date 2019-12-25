import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import {BookingManagingComponent} from './booking-managing/booking-managing.component';
import {SettingComponent} from './setting/setting.component';
import {AdminManagementComponent} from './admin-management.component';
import { DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SectorListComponent} from './sector-list/sector-list.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    BookingManagingComponent,
    SettingComponent,
    AdminManagementComponent,
    SectorListComponent,
  ],
  exports: [
    AdminSidebarComponent,
    AdminManagementComponent,
    SettingComponent,
    BookingManagingComponent
  ],
  imports: [
    DataTablesModule,
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminManagementModule { }
