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
import {AdminManagementRoutingModule} from './admin-management-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { TournamentTableRowComponent } from './tournament/tournament-table-row/tournament-table-row.component';
import { FilterComponent } from './tournament/filter/filter.component';
import { FilterPipe } from '../../shared/pipes/filter.pipe';

import {MatDialogModule} from '@angular/material/dialog';
import {BookingTableComponent} from './booking-managing/booking-table/booking-table.component';
import {TableNavbarComponent} from './booking-managing/table-navbar/table-navbar.component';
import {BookingTableRowComponent} from './booking-managing/booking-table-row/booking-table-row.component';
import {DeleteDialogComponent} from './tournament/delete-dialog/delete-dialog.component';
import {UpdateDialogComponent} from './tournament/update-dialog/update-dialog.component';


@NgModule({
  declarations: [
    UpdateDialogComponent,
    DeleteDialogComponent,
    TableNavbarComponent,
    AdminSidebarComponent,
    BookingManagingComponent,
    SettingComponent,
    AdminManagementComponent,
    SectorListComponent,
    TournamentComponent,
    TournamentTableComponent,
    TournamentTableRowComponent,
    FilterComponent,
    FilterPipe,
    BookingTableComponent,
    BookingTableRowComponent,
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
    SharedModule,
    AdminManagementRoutingModule,
    FormsModule,
    MatDialogModule,
  ]
})
export class AdminManagementModule { }
