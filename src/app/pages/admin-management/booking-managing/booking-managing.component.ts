import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../../../core/services/booking.service';
import {Booking} from '../../../shared/models/booking.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../shared/dialogs/delete-dialog/delete-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-booking-managing',
  templateUrl: './booking-managing.component.html',
  styleUrls: ['./booking-managing.component.sass']
})
export class BookingManagingComponent implements OnInit {

  isApproved = null;
  isExpired = false;

  updateDialog: MatDialogRef<DeleteDialogComponent>;

  dataSource: MatTableDataSource<Booking>;
  displayedColumns = [ 'id', 'sectorId', 'startDate', 'endDate', 'actions' ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private bookingService: BookingService,
              private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(
      bookings => {
        this.dataSource = new MatTableDataSource<Booking>(bookings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property): string|number => {
          switch (property) {
          case 'startDate': return new Date(item.bookingStart).getTime();
          case 'endDate': return new Date(item.bookingEnd).getTime();
          default: return item[property];
        }
        };
      });
  }

  updateBooking(booking: Booking, isApproved: boolean) {
    this.updateDialog = this.dialog.open(DeleteDialogComponent, {
      hasBackdrop: false,
      width: '35%',
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        booking.isApproved = isApproved;
        this.bookingService.updateBooking(booking).subscribe( data => {
        this.loadBookings();
      });
      });
  }
  deleteBooking(booking: Booking) {
    this.updateDialog = this.dialog.open(DeleteDialogComponent, {
      hasBackdrop: false,
      width: '35%',
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.bookingService.deleteBooking(booking.id).subscribe( data => {
          this.loadBookings();
        });
      });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getByCondition(isApproved: boolean, isExpired: boolean){
    this.isApproved = isApproved;
    this.isExpired = isExpired;
    this.loadBookings();
  }
}
