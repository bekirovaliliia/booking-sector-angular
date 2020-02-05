import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../../../../shared/models/booking.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BookingService } from '../../../../core/services/booking.service';
import { BookingManagingDataService } from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-booking-table-tournament',
  templateUrl: './booking-table-tournament.component.html',
  styleUrls: ['./booking-table-tournament.component.sass']
})
export class BookingTableTournamentComponent implements OnInit {
  @Input() selectedCheckbox: boolean;
  isApproved: boolean;
  isExpired: boolean;
  displayedColumns = ['id', 'tournamentId', 'sectorId', 'startDate', 'endDate', 'actions'];
  withoutDatasText = 'No data found!';
  dataSource = new MatTableDataSource<Booking>([]);
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
      this.isApproved  = data.isApproved;
      this.isExpired = data.isExpired;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    // this.bookingService.getBookings(this.isApproved, this.isExpired).subscribe(
    //   bookings => {
    //     this.dataSource.data =  bookings.filter(x => x.tournamentId !== null);
    //     this.dataSource.sortingDataAccessor = (item, property): string | number => {
    //       switch (property) {
    //         case 'startDate':
    //           return new Date(item.bookingStart).getTime();
    //         case 'endDate':
    //           return new Date(item.bookingEnd).getTime();
    //         default:
    //           return item[property];
    //       }
    //     };
    //   });
  }
}
