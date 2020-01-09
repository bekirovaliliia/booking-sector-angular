import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { BookingsDataSource } from './bookingsDataSource';
import {BookingService} from '../../../core/services/booking.service';
import {Booking} from '../../../shared/models/booking.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements AfterViewInit, OnInit {

  isApproved = true;
  booking: Booking;
  dataSource: BookingsDataSource;
  displayedColumns = [ 'id', 'sectorId' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private bookingService: BookingService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.dataSource = new BookingsDataSource(this.bookingService);
    this.dataSource.getBookings();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadBookignsPage())
      )
      .subscribe();
  }

  private loadBookignsPage() {

  }
}
