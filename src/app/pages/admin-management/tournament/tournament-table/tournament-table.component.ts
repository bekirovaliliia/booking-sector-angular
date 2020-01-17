import {Component,  Input, OnInit, Output, OnChanges, ViewChild} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import { MatDialog, MatDialogRef, MatTable, MatTableDataSource,  MatPaginator, MatSort} from '@angular/material';
import {AddUpdateTournamentDialogComponent} from '../add-update-tournament-dialog/add-update-tournament-dialog.component';
import {filter} from 'rxjs/operators';
import {DeleteDialogComponent} from '../../../../shared/dialogs/delete-dialog/delete-dialog.component';
import {FilterPipe} from '../../../../shared/pipes/filter.pipe';
import {SearchPipe} from '../../../../shared/pipes/search.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.sass']
})

export class TournamentTableComponent implements OnInit, OnChanges {
  @Input() groupFilters: object;
  @Input() searchText: string;
  @Input() withoutDatasText = 'No records found!';
  selectedRow: number;

  tournamentHeader: string[];
  tournaments: Tournament[];

  addDialog: MatDialogRef<AddUpdateTournamentDialogComponent>;
  updateDialog: MatDialogRef<AddUpdateTournamentDialogComponent>;
  deleteDialog: MatDialogRef<DeleteDialogComponent>;

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
  ) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this.tournamentService.getAll().subscribe(res => {
      this.tournaments = res;
      this.tournamentHeader = (this.tournaments && this.tournaments.length > 0) ? Object.keys(this.tournaments[0]) : [];
      this.tournamentHeader.push('action');
      if (this.groupFilters) {
        this.dataSource.data = this.filterPipe.transform(this.tournaments, this.groupFilters, Object.keys(this.groupFilters));
      } else  {
        this.dataSource.data = this.tournaments;
      }
    });
  }

  deleteTournament(id: number) {
    this.deleteDialog = this.dialog.open(DeleteDialogComponent, {
      hasBackdrop: false,
    });
    this.deleteDialog
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(name => {
        this.tournamentService.delete(id).subscribe(
          data => {
         this.getTournaments();
          }
        );
      });
  }

  openAddDialog(selectedTournament: Tournament) {
    selectedTournament.tournamentStart = moment().toString();
    selectedTournament.tournamentEnd = moment().toString();

    this.addDialog = this.dialog.open(AddUpdateTournamentDialogComponent, {
        hasBackdrop: false,
        width: '600px',
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

  openUpdateDialog(selectedTournament: Tournament){
    console.log(selectedTournament.tournamentStart);
    this.updateDialog = this.dialog.open(AddUpdateTournamentDialogComponent, {
      hasBackdrop: false,
      width: '600px',
      minWidth: '250px',
      data: {
        dialogTitle: `Update Tournament ${selectedTournament.id}`,
        isUpdated: true,
        selectedTournament,
      }
    });
    this.updateDialog
      .afterClosed()
      .pipe(
        filter(tour => tour)
      )
      .subscribe(tour => {
            this.tournamentService.update(tour).subscribe( data => {
            this.getTournaments();
          });
        });
  }

  ngOnChanges(): void {
    if (this.groupFilters) {
      this.dataSource.data = this.filterPipe.transform(this.tournaments, this.groupFilters, Object.keys(this.groupFilters));
      if (this.searchText) {
        this.dataSource.data  = this.searchPipe.transform(this.dataSource.data, this.searchText, Object.keys(this.tournaments[0]));
      }
    } else if (this.searchText || this.searchText === ''){
      this.dataSource.data  = this.searchPipe.transform(this.tournaments, this.searchText, Object.keys(this.tournaments[0]));
    }
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
}
