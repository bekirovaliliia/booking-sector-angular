import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from '../../../../shared/models/booking.model';
import { DeleteDialogComponent } from '../../../../shared/dialogs/delete-dialog/delete-dialog.component';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../../../core/services/booking.service';
import { BookingManagingDataService } from '../../../../core/services/booking-managing-data.service';


declare var require: any;

@Component({
  selector: 'app-booking-actions',
  templateUrl: './booking-actions.component.html',
  styleUrls: ['./booking-actions.component.sass']
})
export class BookingActionsComponent implements OnInit {

  @Input() booking: Booking;
  @Output() bookingAction = new EventEmitter();

  imgApprove = require('../../../../shared/images/approved.png');
  imgDecline = require('../../../../shared/images/declined.png');
  imgDiscard = require('../../../../shared/images/discard.png');
  imgDelete = require('../../../../shared/images/trash.png')

  updateDialog: MatDialogRef<DeleteDialogComponent>;
  isApproved: boolean;
  isExpired: boolean;

  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
    this.conditionSource.currentConditions.subscribe(data => {
      this.isApproved = data.isApproved;
      this.isExpired = data.isExpired;
    });
  }

  updateBooking(isApproved: boolean) {
    this.updateDialog = this.dialog.open(DeleteDialogComponent, {
      width: '35%',
      panelClass: ['no-padding'],
      data: {
        dialogTitle: `Change status of booking`
      }
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.booking.isApproved = isApproved;
        this.bookingService.updateBooking(this.booking).subscribe( data => {
          this.bookingAction.emit();
        });
      });
  }

  deleteBooking() {
    this.updateDialog = this.dialog.open(DeleteDialogComponent, {
      width: '35%',
      panelClass: ['no-padding'],
      data: {
        dialogTitle: `Delete booking`
      }
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.bookingService.deleteBooking(this.booking.id).subscribe(data => {
          this.bookingAction.emit();
        });
      });
  }
}
