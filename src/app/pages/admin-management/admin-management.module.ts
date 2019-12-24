import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import {BookingManagingComponent} from './booking-managing/booking-managing.component';
import {SettingComponent} from './setting/setting.component';
import {AdminManagementComponent} from './admin-management.component';
import {AppRoutingModule} from '../../app-routing.module';
import { DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    BookingManagingComponent,
    SettingComponent,
    AdminManagementComponent
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
    AppRoutingModule,
    FormsModule
  ]
})
export class AdminManagementModule { }
