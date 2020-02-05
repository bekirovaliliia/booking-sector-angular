import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BookingManagingDataService } from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-booking-tabs',
  templateUrl: './booking-tabs.component.html',
  styleUrls: ['./booking-tabs.component.sass']
})
export class BookingTabsComponent implements OnInit, OnChanges {

  isApproved = null;
  isExpired = false;
  @Input() selectedCheckbox: boolean;

  constructor(private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.selectedCheckbox) {
      if (this.isApproved === null)
      {
        this.isApproved = true;
      }
      this.setConditions( this.isApproved, this.isExpired );
    } else {
      this.setConditions( this.isApproved, this.isExpired );
    }
  }

  setConditions( isApproved: boolean, isExpired: boolean ) {
    this.isApproved = isApproved;
    this.isExpired = isExpired;
    this.conditionSource.setConditions(isApproved, isExpired);
  }

}
