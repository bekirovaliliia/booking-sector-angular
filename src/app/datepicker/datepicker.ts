import {Component} from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.html'
  })

export class CustomRangesComponent {
    
    selected: any;
    alwaysShowCalendars: boolean;
    showRangeLabelOnInput: boolean;
    keepCalendarOpeningWithRange: boolean;
    maxDate: moment.Moment;
    minDate: moment.Moment;
    
  
    constructor() {
      this.maxDate = moment().add(1,  'months');
      this.minDate = moment();
      this.alwaysShowCalendars = true;
      this.keepCalendarOpeningWithRange = true;
      this.showRangeLabelOnInput = true;
      this.selected = {startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days')};
    
    }
    rangeClicked(range) {
      console.log('[rangeClicked] range is : ', range);
      return range;
    }
    datesUpdated(range) {
      console.log('[datesUpdated] range is : ', range);
      return range;
    }
}
