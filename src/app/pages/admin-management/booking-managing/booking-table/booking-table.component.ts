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


  constructor(private bookingService: BookingService) { }

  ngOnInit() {

  }

}
