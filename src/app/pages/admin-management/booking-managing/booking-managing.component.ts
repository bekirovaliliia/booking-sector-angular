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

  isApproved = false;
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
    this.loadBookings(this.isApproved, this.isExpired);
  }

  loadBookings(isApproved: boolean, isExpired: boolean) {
    this.bookingService.getBookings(isApproved, isExpired).subscribe(
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
        console.log(this.dataSource);
      });
  }

  approveBooing(booking: Booking) {
    this.updateDialog = this.dialog.open(DeleteDialogComponent, {
      hasBackdrop: false,
      width: '35%',
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        booking.isApproved = !booking.isApproved;
        this.bookingService.updateBooking(booking).subscribe( data => {
        this.loadBookings(this.isApproved, this.isExpired);
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
          this.loadBookings(this.isApproved, this.isExpired);
        });
      });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getApproved() {
    this.isApproved = true;
    this.isExpired = false;
    this.loadBookings(this.isApproved, this.isExpired);
  }

  getDeclined() {
    this.isApproved = false;
    this.isExpired = false;
    this.loadBookings(this.isApproved, this.isExpired);
  }

  getExpired() {
    this.isExpired = true;
    this.loadBookings(this.isApproved, this.isExpired);
  }
}
