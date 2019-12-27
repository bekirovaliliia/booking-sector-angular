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

    constructor(private dateService: DataService) {
      this.maxDate = moment().add(1,  'months');
      this.minDate = moment();
      this.alwaysShowCalendars = true;
      this.keepCalendarOpeningWithRange = true;
      this.showRangeLabelOnInput = true;
    }

    datesUpdated(range){
      if(range != null){
        this.dateService.changeDateRange(range);
      }
      else{
        this.dateService.showAllSectors();
      }
    }

    rangeClicked(range) {
      //console.log('[rangeClicked] range is : ', range);
    }
}
