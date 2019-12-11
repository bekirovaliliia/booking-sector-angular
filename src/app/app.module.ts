import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbdDatepickerBasic } from './datepicker-basic/datepicker-basic';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    NgbdDatepickerBasic,
    NgbdDatepickerPopup
  ],
  exports: [
    NgbdDatepickerBasic,
    NgbdDatepickerPopup
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    NgbdDatepickerBasic,
    NgbdDatepickerPopup
  ]
})
export class AppModule { }
