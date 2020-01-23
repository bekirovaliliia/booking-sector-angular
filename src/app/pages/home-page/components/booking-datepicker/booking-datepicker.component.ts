import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';

@Component({
    selector: 'app-booking-datepicker',
    templateUrl: './booking-datepicker.component.html',
    styleUrls: ['./booking-datepicker.component.css']
  })
export class CustomRangesComponent {
   @Input() selected: any;
    alwaysShowCalendars: boolean;
    showRangeLabelOnInput: boolean;
    keepCalendarOpeningWithRange: boolean;
    maxDate: moment.Moment;
    minDate: moment.Moment;
    startDate;
    endDate;

    constructor(private dataService: BookingSectorsDataService) {
      this.selected = moment().format('YYYY-MM-DD');
      this.maxDate = moment().add(1,  'months');
      this.minDate = moment();
      this.alwaysShowCalendars = true;
      this.keepCalendarOpeningWithRange = true;
      this.showRangeLabelOnInput = true;
    }

    datesUpdated(range) {
      if (range.startDate != null && range.endDate != null) {
        this.startDate = range.startDate.format('YYYY-MM-DD');
        this.endDate = range.endDate.format('YYYY-MM-DD');
        this.dataService.changeDateRange(this.startDate, this.endDate);
      }
    }
}
