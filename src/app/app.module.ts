import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';
import { NgbdDatepickerRangePopup } from './datepicker-range-popup/datepicker-range-popup';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    NgbdDatepickerPopup,
    NgbdDatepickerRangePopup
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
