import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import {Subject} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {filter} from 'rxjs/operators';
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component';

declare  var  require: any;
@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.sass']
})
export class TournamentTableComponent implements OnInit, OnDestroy, OnChanges {
  imgAdd = require('../../../../shared/images/add.png');
  @Input() groupFilters: object;
  @Input() searchByKeyword: string;
  @Input() tournaments: Tournament[];
  filteredTours : Tournament[];
  // @Input() bookedTournaments: Booking[];
  tournament: Tournament;
  // booking: Booking;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRow: number;
  updateStr = 'Updating tournament';
  addString = 'New tournament';
  tourHeaders: string[];
  // bookHeaders: string[];
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  addUpdateDialogRef: MatDialogRef<UpdateDialogComponent>;

  constructor( private tournamentService: TournamentService,
               //     private bookingService: BookingService,
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
//    this.getBookings();
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe(res => {
      this.tournaments = res;

      this.filteredTours = res;
      this.tourHeaders = (this.tournaments && this.tournaments.length > 0) ? Object.keys(this.tournaments[0]) : [];
      this.dtTrigger.next();
    });
  }
  /*
  getBookings() {
    this.bookingService.getBookedTournaments().subscribe(res => {
      this.bookedTournaments = res;
      this.bookHeaders = (this.bookedTournaments && this.bookedTournaments.length > 0) ? Object.keys(this.bookedTournaments[0]) : [];

    });
  }
*/
  changeItem($event) {
    if ($event.action === 'Delete') {
      this.openDeleteDialog();
      this.deleteDialogRef
        .afterClosed()
        .pipe(filter(name => name))
        .subscribe(name => {
            this.deleteItem($event.id);
          }
        );
    } else if ($event.action === 'Update') {
      this.tournamentService.getTournamentById($event.id).subscribe(res => {
        this.tournament = res;
        this.openAddOrUpdateDialog(this.tournament, this.updateStr, true);
        this.addUpdateDialogRef
          .afterClosed()
          .pipe(
            filter(tour => tour)
          )
          .subscribe(tour => {
            console.log(tour);
            this.updateItem(tour);
          });
      });
    } else {
      const newTournament = new Tournament();
      this.openAddOrUpdateDialog(newTournament, this.addString, false);
      this.addUpdateDialogRef
        .afterClosed()
        .pipe(
          filter(tour => tour)
        )
        .subscribe(tour => {
          console.log(tour);
          this.addItem(tour);
        });
    }
  }

  deleteItem(id) {
    console.log('del');
    this.tournamentService.deleteTournament(id).subscribe(
      data => {
        this.getTournaments();
      }
    );
  }

  updateItem(tour: Tournament) {
    console.log('upd');
    this.tournamentService.updateTournament(tour).subscribe(
      data => {
        this.getTournaments();
      }
    );
  }
  addItem(tour: Tournament) {
    tour.id = 0;
    console.log('upd');
    this.tournamentService.addTournament(tour).subscribe(
      data => {
        this.getTournaments();
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

  openAddOrUpdateDialog(tour: Tournament, titleStr: string, isupdated: boolean) {
    this.addUpdateDialogRef = this.dialog.open(UpdateDialogComponent, {
      hasBackdrop: false,
      width: '35%',
      data: {
        isUpdated: isupdated,
        title: titleStr,
        id: tour ? tour.id : '',
        name: tour ? tour.name : '',
        description: tour ? tour.description : '',
        preparationTerm: tour ? tour.preparationTerm : '',
      },

    });
    return this.addUpdateDialogRef;
  }

  getSelectedRow(item): void {
    this.selectedRow = item;
  }

  isSelected(item: number): boolean {
    if (!this.selectedRow) {
      return false;
    }

    return this.selectedRow ===  item ? true : false;

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.groupFilters) {this.filterTable(this.groupFilters, this.tournaments); }
  }
  filterTable(filters: any, users: any): void {
    this.filteredTours = this.tournaments;
    const keys = Object.keys(filters);
    const filterUser = user => {
      let result = keys.map(key => {

          if(user[key]) {
            return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else {
            return false;
          }

      });

      result = result.filter(it => it !== undefined);

      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredTours = this.tournaments.filter(filterUser);
  }
}
