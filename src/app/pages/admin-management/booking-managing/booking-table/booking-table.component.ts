import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BookingService} from '../../../../core/services/booking.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingManagingDataService} from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.sass']
})
export class BookingTableComponent implements OnInit {
  @Input() selectedCheckbox: boolean;
  isApproved: boolean;
  isExpired: boolean;
  displayedColumns = ['id', 'sectorId', 'startDate', 'endDate', 'actions'];

  dataSource = new MatTableDataSource<Booking>([]);
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

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
        this.dataSource.data = bookings;
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
