import {Component,  Input,  OnInit,  Output,  EventEmitter,  OnChanges, ViewChild} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import { MatDialog, MatDialogRef, MatTable, MatTableDataSource,  MatPaginator, MatSort} from '@angular/material';
import {AddUpdateDialogComponent} from '../add-update-dialog/add-update-dialog.component';
import {filter} from 'rxjs/operators';
import {DeleteDialogComponent} from '../../../../shared/dialogs/delete-dialog/delete-dialog.component';
import {FilterPipe} from '../../../../shared/pipes/filter.pipe';
import {SearchPipe} from '../../../../shared/pipes/search.pipe';
import {BookingService} from '../../../../core/services/booking.service';

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

  addUpdateDialog: MatDialogRef<AddUpdateDialogComponent>;
  deleteDialog: MatDialogRef<DeleteDialogComponent>;

  dataSource = new MatTableDataSource<Tournament>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
  this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort){
    this.dataSource.sort = sort;
  }

  constructor( private tournamentService: TournamentService,
               private bookingService: BookingService,
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

  openAddUpdateDialog(selectedTournament: Tournament, action: string){
      this.addUpdateDialog = this.dialog.open(AddUpdateDialogComponent, {
        hasBackdrop: false,
        width: '500px',
        minWidth: '250px',
        data: {
           dialogTitle: (action === 'Add') ? 'New Tournament' : 'Update Tournament',
           isUpdated: (action === 'Add') ? false : true,
           selectedTournament,
        }
      });
      this.addUpdateDialog
        .afterClosed()
        .pipe(
          filter(tour => tour)
        )
        .subscribe(tour => {
          if (action === 'Add') {
            tour.id = 0;
            this.tournamentService.add(tour).subscribe(data => {
              this.getTournaments();
            });
          } else if (action === 'Update') {
            this.tournamentService.update(tour).subscribe( data => {
              this.getTournaments();
            });
          }
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
