import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import {TournamentService} from '../../core/services/tournament.service';
import {BookingService} from '../../core/services/booking.service';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import {SearchPipe} from '../../shared/pipes/search.pipe';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';
import {DetailsTournamentDialogComponent} from './details-tournament-dialog/details-tournament-dialog.component';
import {AddUpdateTournamentDialogComponent} from "../admin-management/tournament/add-update-tournament-dialog/add-update-tournament-dialog.component";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-future-tournament-page',
  templateUrl: './future-tournament-page.component.html',
  styleUrls: ['./future-tournament-page.component.sass']
})
export class FutureTournamentPageComponent implements OnInit {

  @Input() withoutDataText = 'No records found!';
  selectedRow: number;

  tournamentHeader: string[];
  tournaments: Tournament[];

  detailsDialog: MatDialogRef<DetailsTournamentDialogComponent>;

  dataSource = new MatTableDataSource<Tournament>([]);
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor( private tournamentService: TournamentService,
               private dialog: MatDialog,
               private filterPipe: FilterPipe,
               private searchPipe: SearchPipe,
  ) {

  }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this.tournamentService.getAll().subscribe(res => {
      this.tournaments = res;
      this.tournaments = this.tournaments.filter(item => moment(item.tournamentStart) > moment());
      this.tournamentHeader = ['name', 'tournamentStart', 'tournamentEnd', 'action'];

      this.dataSource.data = this.tournaments.sort((a, b) => {
        if (a.tournamentStart > b.tournamentEnd) {
          return 1;
        }
        if (a.tournamentStart === b.tournamentStart) {
          return 0;
        } else {
          return -1;
        }
      } );
    });
  }

  getSelectedRow(item): void {
    this.selectedRow = item;
  }

  isSelected(item: number): boolean {
    if (this.selectedRow < 0) {
      return false;
    }
    return this.selectedRow === item;
  }

  openDetailsDialog(selectedTournament: Tournament){
    console.log(selectedTournament);
    this.detailsDialog = this.dialog.open(DetailsTournamentDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      minWidth: '250px',
      panelClass: ['no-padding'],
      data: {
        dialogTitle: `Tournament details`,
        selectedTournament,
      }
    });
  }
}
