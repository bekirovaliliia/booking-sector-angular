import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { CustomRangesComponent } from './datepicker/datepicker';
import {BookingManagingComponent} from './pages/admin-management/booking-managing/booking-managing.component';

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBa84Oxrn7z7nvHdRCLjefhguJscTJSqbM'}),
    NgxDaterangepickerMd.forRoot()
 ],
  declarations: [
    AppComponent,
    CustomRangesComponent,
    BookingManagingComponent,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
