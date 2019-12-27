import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingService} from '../../../../core/services/booking.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-booking-table-row',
  templateUrl: './booking-table-row.component.html',
  styleUrls: ['./booking-table-row.component.sass']
})
export class BookingTableRowComponent implements OnInit {



  constructor(private bookingService: BookingService) { }

  ngOnInit() {

  }

}
