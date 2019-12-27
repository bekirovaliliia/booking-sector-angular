import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../../core/services/booking.service';
import {Booking} from '../../../shared/models/booking.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements OnInit {

  bookings$: Booking[];
  tempBookings: Booking[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      responsive: true
    };
    this.bookingService.getBookings().subscribe(data => this.bookings$ = data);
  }
  getApproved() {
    this.tempBookings = this.bookings$.filter(s => s.isApproved);
    this.dtTrigger.next();
  }
  getDeclined(): Booking[] {
    return this.tempBookings = this.bookings$.filter(s => !s.isApproved);
  }
  approveBooking(booking: Booking) {
   booking.isApproved = true;
   this.bookingService.updateBooking(booking).subscribe();
  }
  declineBooking(booking: Booking) {
    this.bookingService.deleteBooking(booking.id).subscribe();
  }
}
