import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import {Subject} from 'rxjs';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingService} from '../../../../core/services/booking.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {filter} from 'rxjs/operators';
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.sass']
})
export class TournamentTableComponent implements OnInit, OnDestroy {
  @Input() searchModel: string;
  @Input() tournaments: Tournament[];
  @Input() bookedTournaments: Booking[];
  tournament: Tournament;
  booking: Booking;


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRow: number;

  tourHeaders: string[];
  bookHeaders: string[];

  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  updateDialogRef: MatDialogRef<UpdateDialogComponent>;

  constructor( private tournamentService: TournamentService,
               private bookingService: BookingService,
               private ref: ChangeDetectorRef,
               private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      retrieve: true,
      select: true,
    };

    this.getTournaments();
    this.getBookings();
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe(res => {
      this.tournaments = res;
      console.log(this.tournaments);
      this.tourHeaders = (this.tournaments && this.tournaments.length > 0) ? Object.keys(this.tournaments[0]) : [];
      console.log(this.tourHeaders);
    });
  }
  getBookings() {
    this.bookingService.getBookedTournaments().subscribe(res => {
      this.bookedTournaments = res;
      this.bookHeaders = (this.bookedTournaments && this.bookedTournaments.length > 0) ? Object.keys(this.bookedTournaments[0]) : [];
      this.dtTrigger.next();
    });
  }

  changeItem($event) {
    if ($event.action === 'Delete') {
      this.openDeleteDialog();
      this.deleteDialogRef
        .afterClosed()
        .pipe(filter(name => name))
        .subscribe(name => {
            // this.deleteItem($event.id)
          }
        );
    }
    if ($event.action === 'Update') {
      this.bookingService.getBookingById($event.id).subscribe(res => {
        this.booking = res;
        this.openUpdateDialog(this.booking);
        this.updateDialogRef
          .afterClosed()
          .pipe(filter(name => name))
          .subscribe(name => {
              this.updateItem(this.booking);
            }
          );
      });
    }
  }

  deleteItem(id) {
    console.log('del');
    this.bookingService.deleteBooking(id).subscribe(
      data => {
        this.getBookings();
      }
    );
    for (let i = 0; i < this.bookedTournaments.length; ++i) {
      if (this.bookedTournaments[i].id === id) {
        this.bookedTournaments.splice(i, 1 );
      }
    }
  }

  updateItem(booking) {
    console.log('upd');
    this.bookingService.updateBooking(booking).subscribe(
      data => {
        this.getBookings();
      }
    );
  }

  openDeleteDialog() {
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent, {

      hasBackdrop: false,
      width: '35%',
    });
    return this.deleteDialogRef;
  }

  openUpdateDialog(tour: Booking) {
    console.log(tour);
    this.updateDialogRef = this.dialog.open(UpdateDialogComponent, {
      hasBackdrop: false,
      width: '35%',
      data: {
        tourId: tour ? tour.tournamentId : '',
        bookStart: tour ? tour.bookingStart : '',
        bookEnd: tour ? tour.bookingEnd : '',
        sectorId: tour ? tour.sectorId : '',

      },

    });
    console.log(tour);
    return this.updateDialogRef;
  }

  getSelectedRow(item): void {
    this.selectedRow = item;
  }

  isSelected(item): boolean {
    if (!this.selectedRow) {
      return false;
    }
    return this.selectedRow ===  item ? true : false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
