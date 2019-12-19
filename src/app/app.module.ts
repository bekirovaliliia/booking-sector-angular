import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';
import { NgbdDatepickerRangePopup } from './datepicker-range-popup/datepicker-range-popup';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBa84Oxrn7z7nvHdRCLjefhguJscTJSqbM'})
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
