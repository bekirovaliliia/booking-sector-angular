import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { BookingManagingComponent } from './booking-managing/booking-managing.component';
import { SettingComponent } from './setting/setting.component';
import { AdminManagementComponent } from './admin-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { FilterComponent } from './tournament/filter/filter.component';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';

import { SectorTableComponent } from './sector/sector-table/sector-table.component';
import { SectorComponent } from './sector/sector.component';

import { AddBtnComponent } from '../../shared/buttons/add-btn/add-btn.component';
import { DataTablesModule} from 'angular-datatables';
import { DeleteBtnComponent } from '../../shared/buttons/delete-btn/delete-btn.component';
import { UpdateBtnComponent } from '../../shared/buttons/update-btn/update-btn.component';
import { SearchBtnComponent } from '../../shared/buttons/search-btn/search-btn.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GlobalSearchComponent } from './tournament/global-search/global-search.component';
import { MatSortModule } from '@angular/material/sort';
import { ClearBtnComponent } from '../../shared/buttons/clear-btn/clear-btn.component';
import { WithoutDatasComponent } from '../../shared/without-datas/without-datas.component';
import { BookingTabsComponent } from './booking-managing/booking-tabs/booking-tabs.component';
import { BookingTableComponent } from './booking-managing/booking-table/booking-table.component';
import { BookingActionsComponent } from './booking-managing/booking-actions/booking-actions.component';
import { TournamentCheckboxComponent } from './booking-managing/tournament-checkbox/tournament-checkbox.component';
import { MatRadioModule } from "@angular/material/radio";
import { BookingTableTournamentComponent } from './booking-managing/booking-table-tournament/booking-table-tournament.component';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    BookingManagingComponent,
    SettingComponent,
    AdminManagementComponent,
    TournamentComponent,
    TournamentTableComponent,
    FilterComponent,
    FilterPipe,
    SectorTableComponent,
    SectorComponent,
    AddBtnComponent,
    DeleteBtnComponent,
    UpdateBtnComponent,
    SearchBtnComponent,
    GlobalSearchComponent,
    ClearBtnComponent,
    WithoutDatasComponent,
    BookingTabsComponent,
    BookingTableComponent,
    BookingActionsComponent,
    TournamentCheckboxComponent,
    BookingTableTournamentComponent,

  ],
  exports: [
    AdminSidebarComponent,
    AdminManagementComponent,
    SettingComponent,
    BookingManagingComponent,
    WithoutDatasComponent
  ],
  imports: [
    CommonModule,
    AdminManagementRoutingModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class AdminManagementModule { }
