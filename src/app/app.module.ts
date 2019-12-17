import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';
import { NgbdDatepickerRangePopup } from './datepicker-range-popup/datepicker-range-popup';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SectorListComponent } from './sector-list/sector-list';
@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule
 ],
  declarations: [
    AppComponent,
    NgbdDatepickerPopup,
    NgbdDatepickerRangePopup,
    SectorListComponent
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
