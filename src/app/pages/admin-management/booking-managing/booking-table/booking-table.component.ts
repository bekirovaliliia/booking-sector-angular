import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BookingService} from '../../../../core/services/booking.service';
import {MatTableDataSource} from '@angular/material/table';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingManagingDataService} from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.sass']
})
export class BookingTableComponent implements OnInit {

  isApproved: boolean;
  isExpired: boolean;
  dataSource: MatTableDataSource<Booking>;
  displayedColumns = ['id', 'sectorId', 'startDate', 'endDate', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookingService: BookingService,
              private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.conditionSource.currentConditions.subscribe(data => {
      this.isApproved = data.isApproved;
      this.isExpired = data.isExpired;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.bookingService.getBookings(this.isApproved, this.isExpired).subscribe(
      bookings => {
        this.dataSource = new MatTableDataSource<Booking>(bookings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property): string | number => {
          switch (property) {
            case 'startDate':
              return new Date(item.bookingStart).getTime();
            case 'endDate':
              return new Date(item.bookingEnd).getTime();
            default:
              return item[property];
          }
        };
      });
  }

}
