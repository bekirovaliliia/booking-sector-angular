import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingService} from '../../../core/services/booking.service';
import {Subject} from 'rxjs';
import {DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements OnInit {

  bookings$: Booking[];
  tempBookings: Booking[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  getApproved(): Booking[] {
    return  this.tempBookings = this.bookings$.filter(b => b.isApproved);
  }
  getDeclined(): Booking[] {
    return this.tempBookings = this.bookings$.filter(b => !b.isApproved);
  }
  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      responsive: true
    };
    this.bookingService.getBookings().subscribe(data => {
        this.bookings$ = data,
          this.dtTrigger.next();
      }
    );
  }

}
