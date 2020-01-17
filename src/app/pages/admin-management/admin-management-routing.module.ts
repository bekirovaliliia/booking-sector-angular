import { SectorComponent } from './sector/sector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminManagementComponent} from './admin-management.component';
import {SettingComponent} from './setting/setting.component';
import {TournamentComponent} from './tournament/tournament.component';
import {BookingManagingComponent} from './booking-managing/booking-managing.component';
import {CalendarComponent} from './calendar/calendar.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminManagementComponent, children: [
      {
        path: 'settings', component: SettingComponent
      },
      {
        path: 'tournaments', component: TournamentComponent
      },
      {
        path: 'bookings', component: BookingManagingComponent
      },
      {
        path: 'sectors', component: SectorComponent
      },
      {
        path: 'calendar', component: CalendarComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
