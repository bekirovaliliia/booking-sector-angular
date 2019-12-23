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
import {AdminManagementModule} from './pages/admin-management/admin-management.module';

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBa84Oxrn7z7nvHdRCLjefhguJscTJSqbM'
    }),
    NgxDaterangepickerMd.forRoot(),
    AdminManagementModule,
  ],
  declarations: [
    AppComponent,
    CustomRangesComponent,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
