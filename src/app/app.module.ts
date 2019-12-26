import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {DatePipe} from '@angular/common';
import {DeleteDialogComponent} from './pages/admin-management/tournament/delete-dialog/delete-dialog.component';
import {UpdateDialogComponent} from './pages/admin-management/tournament/update-dialog/update-dialog.component';
import { BookingTableComponent } from './pages/admin-management/booking-managing/booking-table/booking-table.component';
import { BoookingTableRowComponent } from './pages/admin-management/booking-managing/boooking-table-row/boooking-table-row.component';

@NgModule({
  imports: [
    PagesModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    BookingTableComponent,
    BoookingTableRowComponent,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [DeleteDialogComponent, UpdateDialogComponent]
})
export class AppModule { }
