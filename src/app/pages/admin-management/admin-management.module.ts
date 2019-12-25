import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import {BookingManagingComponent} from './booking-managing/booking-managing.component';
import {SettingComponent} from './setting/setting.component';
import {AdminManagementComponent} from './admin-management.component';
import { DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {AdminManagementRoutingModule} from './admin-management-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { TournamentTableRowComponent } from './tournament/tournament-table-row/tournament-table-row.component';
import { FilterComponent } from './tournament/filter/filter.component';
import {FilterPipe} from '../../shared/pipes/filter.pipe';

import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AdminSidebarComponent,
    BookingManagingComponent,
    SettingComponent,
    AdminManagementComponent,
    TournamentComponent,
    TournamentTableComponent,
    TournamentTableRowComponent,
    FilterComponent,
    FilterPipe,


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
    AdminManagementRoutingModule,
    FormsModule,
    MatDialogModule,


  ]
})
export class AdminManagementModule { }
