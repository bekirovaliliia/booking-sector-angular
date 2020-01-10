import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingService} from '../../../core/services/booking.service';
import {Subject, from} from 'rxjs';
import {filter} from 'rxjs/operators';

declare  var  require: any;
@Component({
  selector: 'app-actual-bookings-table',
  templateUrl: './actual-bookings-table.component.html',
  styleUrls: ['./actual-bookings-table.component.sass']
})
export class ActualBookingsTableComponent implements OnInit {
  imgCancel = require('../../../shared/images/cancel.png');
  booking: Booking;
  userId:number = 1;
  bookingHeaders: string[];
  dtOptions: any = {};
  idToDelete: number;
  
  bookings: Booking[];
  filteredBookings: Booking[];
  dtTrigger: Subject<any> = new Subject();
  constructor(private bookingService: BookingService,) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      retrieve: true,
      select: true,
    };
    this.getBookings();
  }

  getBookings()
  {
    this.bookingService.getUserBookings(this.userId).subscribe(res => {
      this.bookings = res;
      this.filteredBookings = res;
      this.bookingHeaders = (this.bookings && this.bookings.length > 0) ? Object.keys(this.bookings[0]) : [];
      this.dtTrigger.next();
    });
  }
  saveIdToDelete(id: number){
    this.idToDelete = id;
  }
  delete(){
    console.log(this.idToDelete);
    this.bookingService.deleteBooking(this.idToDelete).subscribe();
    
  }
}
