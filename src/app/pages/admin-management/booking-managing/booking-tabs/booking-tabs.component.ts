import { Component, OnInit } from '@angular/core';
import {BookingManagingDataService} from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-booking-tabs',
  templateUrl: './booking-tabs.component.html',
  styleUrls: ['./booking-tabs.component.sass']
})
export class BookingTabsComponent implements OnInit {

  public isApproved = null;
  public isExpired = false;

  constructor(private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
  }

  setConditions( isApproved: boolean, isExpired: boolean ) {
    this.isApproved = isApproved;
    this.isExpired = isExpired;
    this.conditionSource.setConditions(isApproved, isExpired);
  }

}
