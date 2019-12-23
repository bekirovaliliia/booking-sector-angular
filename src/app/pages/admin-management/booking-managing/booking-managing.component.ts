import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingService} from '../../../core/services/booking.service';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements OnInit {

  bookings$: Booking[];
  tempBookings: Booking[];

  getApproved(): Booking[] {
    return  this.tempBookings = this.bookings$.filter(b => b.isApproved);
  }
  getDeclined(): Booking[] {
    return this.tempBookings = this.bookings$.filter(b => !b.isApproved);
  }
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    return this.bookingService.getBookings().subscribe(data => this.bookings$ = data);
  }

}
