import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingService} from '../../../core/services/booking.service';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements OnInit {



  getNew(): Booking[] {
    return  this.tempBookings = this.bookings$.filter(b => b.isApproved == null);
  }
  getApproved(): Booking[] {
    return  this.tempBookings = this.bookings$.filter(b => b.isApproved);
  }
  getDeclined(): Booking[] {
    return this.tempBookings = this.bookings$.filter(b => !b.isApproved);
  }
  getAll(): Booking[] {
    return this.tempBookings = this.bookings$;
  }
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

}
