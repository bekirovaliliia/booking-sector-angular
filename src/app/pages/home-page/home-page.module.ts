import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSectorFormComponent } from './book-sector-form/book-sector-form.component';
import { SectorsMapComponent } from './sectors-map/sectors-map.component';
import {HomePageComponent} from './home-page.component';
import {SharedModule} from '../../shared/shared.module';
import {AgmCoreModule} from '@agm/core';
import {CustomRangesComponent} from './datepicker/datepicker';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';


@NgModule({
  declarations: [
    BookSectorFormComponent,
    SectorsMapComponent,
    HomePageComponent,
    CustomRangesComponent,
  ],
  exports: [
    SectorsMapComponent,
    BookSectorFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule,
    NgxDaterangepickerMd,
  ]
})
export class HomePageModule { }
