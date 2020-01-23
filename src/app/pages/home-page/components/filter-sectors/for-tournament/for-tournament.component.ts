import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../../../core/services/tournament.service';
import { Tournament } from '../../../../../shared/models/tournament';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { BookingSectorsDataService } from '../../../../../core/services/booking-sectors-data.service';
import { AddUpdateTournamentDialogComponent } from
    '../../../../admin-management/tournament/add-update-tournament-dialog/add-update-tournament-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-for-tournament',
  templateUrl: './for-tournament.component.html',
  styleUrls: ['./for-tournament.component.sass'],
})

export class ForTournamentComponent implements OnInit {
  tournaments: Tournament[];
  selected = '';
  addDialog: MatDialogRef<AddUpdateTournamentDialogComponent>;
  constructor(
    private tournamentService: TournamentService,
    private dataService: BookingSectorsDataService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTournaments();
  }
  getTournaments() {
    this.tournamentService.getAll().subscribe(res => {
      this.tournaments = res;
      this.tournaments = this.tournaments.filter(item => moment(item.tournamentStart) > moment());
    });
  }
  onChange(ob) {
    if (ob.value === null) {
      this.selected = `${moment().format('YYYY/MM/DD') } - ${ moment().format('YYYY/MM/DD')  }`;
      return;
    }
    const dateStart = this.datePipe.transform(ob.value.tournamentStart, 'yyyy/MM/dd');
    const dateEnd = this.datePipe.transform(ob.value.tournamentEnd, 'yyyy/MM/dd');
    
    this.selected = `${dateStart } - ${ dateEnd }`;
    this.dataService.changeDateRange(ob.value.tournamentStart, ob.value.tournamentEnd);
    this.dataService.selectedTournamentId = ob.value.id;
  }

  openAddDialog() {
    const selectedTournament = new Tournament();
    selectedTournament.tournamentStart = new Date().toString();
    selectedTournament.tournamentEnd = new Date().toString();
    this.addDialog = this.dialog.open(AddUpdateTournamentDialogComponent, {
      hasBackdrop: false,
      panelClass: ['no-padding'],
      width: '650px',
      minWidth: '250px',
      data: {
        dialogTitle: 'New Tournament',
        isUpdated: false,
        selectedTournament,
      }
    });
    this.addDialog
      .afterClosed()
      .pipe(
        filter(tour => tour)
      )
      .subscribe(tour => {
        tour.id = 0;
        this.tournamentService.add(tour).subscribe(data => {
          this.getTournaments();
        });
      });
  }
}
