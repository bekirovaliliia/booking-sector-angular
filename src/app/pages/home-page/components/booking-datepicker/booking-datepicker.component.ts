import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { SettingsService } from 'src/app/core/services/settings.service';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';

@Component({
    selector: 'app-booking-datepicker',
    templateUrl: './booking-datepicker.component.html',
    styleUrls: ['./booking-datepicker.component.css']
  })
export class CustomRangesComponent implements OnInit {
    selected: any;
    alwaysShowCalendars: boolean;
    showRangeLabelOnInput: boolean;
    keepCalendarOpeningWithRange: boolean;
    maxDate: moment.Moment;
    minDate: moment.Moment;
    maxBookingDays: number;
    startDate;
    endDate;

    constructor(private dataService: BookingSectorsDataService, 
                private settingsService: SettingsService) {
      this.selected = moment().format('YYYY-MM-DD');
      this.maxDate = moment().add(1,  'months');
      this.minDate = moment();
      this.alwaysShowCalendars = true;
      this.keepCalendarOpeningWithRange = true;
      this.showRangeLabelOnInput = true;
      this.getMaxBookingDays();
    }

    datesUpdated(range): void {
      if (range.startDate != null && range.endDate != null) {
        this.startDate = range.startDate.format('YYYY-MM-DD');
        this.endDate = range.endDate.format('YYYY-MM-DD');
        this.dataService.changeDateRange(this.startDate, this.endDate);
      }
    }

    getMaxBookingDays(): void {
      this.settingsService.getSettingById(1).subscribe(res => {
        this.maxBookingDays = res.value;
        console.log(this.maxBookingDays);
      });
    }

    ngOnInit(): void {
    }
}
