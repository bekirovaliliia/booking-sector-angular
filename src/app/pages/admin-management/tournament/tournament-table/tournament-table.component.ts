import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import {Subject} from 'rxjs';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingService} from '../../../../core/services/booking.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.sass']
})
export class TournamentTableComponent implements OnInit, OnDestroy {
  @Input() searchModel: string;
  @Input() tournaments: Tournament[];
  @Input() tour: Tournament;
  @Input() bookedTournaments: Booking[];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRow: number;

  tourHeaders: string[];
  bookHeaders: string[];

  fileNameDialogRef: MatDialogRef<DeleteDialogComponent>;

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
      console.log(this.bookedTournaments);
      this.bookHeaders = (this.bookedTournaments && this.bookedTournaments.length > 0) ? Object.keys(this.bookedTournaments[0]) : [];
      console.log(this.bookHeaders);
      this.dtTrigger.next();
    });
  }

  changeItem($event) {
    if ($event.action === 'Delete') {
      this.openAddFileDialog();
      this.deleteItem($event.id);
    }
    if ($event.action === 'Update') {
      this.updateItem($event.id);
    }
  }

  deleteItem(id) {
    console.log('del');
    /*
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

     */
  }
  updateItem(id) {
    console.log('upd');


  }

  openAddFileDialog() {
    this.fileNameDialogRef = this.dialog.open(DeleteDialogComponent);
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
