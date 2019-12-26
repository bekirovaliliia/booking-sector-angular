import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Booking} from '../../../../shared/models/booking.model';
import {Subject} from 'rxjs';
import {BookingService} from '../../../../core/services/booking.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.sass']
})

export class BookingTableComponent implements OnInit {
  bookings$: Booking[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  @Output() bookings = new EventEmitter<Booking[]>();

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
    });
  }

}
