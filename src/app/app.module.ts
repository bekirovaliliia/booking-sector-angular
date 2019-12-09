import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxPopper } from 'angular-popper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerBasic } from './datepicker-basic';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';
import { NgbdDatepickerRangePopup } from './datepicker-rangepopup/datepicker-rangepopup';


@NgModule({
  declarations: [
    AppComponent,
    NgbdDatepickerBasic,
    NgbdDatepickerPopup,
    NgbdDatepickerRangePopup
  ],
  imports: [
    FormsModule, 
    NgbModule,
    NgxPopper,
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    NgbdDatepickerBasic,
    NgbdDatepickerPopup,
    NgbdDatepickerRangePopup
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    NgbdDatepickerBasic,
    NgbdDatepickerPopup,
    NgbdDatepickerRangePopup
  ]
})
export class AppModule { }
