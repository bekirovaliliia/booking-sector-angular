import { Component } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../../../core/services/data.service';

const now: Date = new Date();
@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.html',
    styleUrls:['./datepicker.css']
  })

export class CustomRangesComponent {
    selected: any;
    alwaysShowCalendars: boolean;
    showRangeLabelOnInput: boolean;
    keepCalendarOpeningWithRange: boolean;
    maxDate: moment.Moment;
    minDate: moment.Moment;
    startDate;
    endDate;

    constructor(private dateService: DataService) {
      
      this.selected = moment().format('YYYY-MM-DD');
      this.maxDate = moment().add(1,  'months');
      this.minDate = moment();
      this.alwaysShowCalendars = true;
      this.keepCalendarOpeningWithRange = true;
      this.showRangeLabelOnInput = true;
    }

    datesUpdated(range){ 
      if(range.startDate != null && range.endDate != null)
      {
        this.startDate = range.startDate.format('YYYY-MM-DD');
        this.endDate = range.endDate.format('YYYY-MM-DD');
        this.dateService.changeDateRange(this.startDate, this.endDate);  
      }   
    }

    rangeClicked(range) {
      
    }
}
