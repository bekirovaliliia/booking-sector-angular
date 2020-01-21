import { AddUpdateSectorDialogComponent } from '../add-update-sector-dialog/add-update-sector-dialog.component';
import { DeleteSectorDialogComponent } from '../delete-sector-dialog/delete-sector-dialog.component';
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Sector } from '../../../../shared/models/sector-model';
import { SectorService } from '../../../../core/services/sector.service';
import { MatDialog, MatDialogRef, MatTable, MatTableDataSource,  MatPaginator, MatSort} from '@angular/material';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sector-table',
  templateUrl: './sector-table.component.html',
  styleUrls: ['./sector-table.component.sass']
})

export class SectorTableComponent implements OnInit, OnChanges {
  @Input() withoutDatasText = 'No records found!';
  selectedRow: number;

  sectorHeader: string[];
  sectors: Sector[];

  addDialog: MatDialogRef<AddUpdateSectorDialogComponent>;
  updateDialog: MatDialogRef<AddUpdateSectorDialogComponent>;
  deleteDialog: MatDialogRef<DeleteSectorDialogComponent>;

  dataSource = new MatTableDataSource<Sector>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor( private sectorService: SectorService,
               private dialog: MatDialog) { }

  ngOnInit() {
    this.getSectors();
  }

  getSectors() {
    this.sectorService.getSectors().subscribe(res => {
      this.sectors = res;
      this.sectorHeader = (this.sectors && this.sectors.length > 0) ? Object.keys(this.sectors[0]) : [];
      this.dataSource.data = this.sectors;
    });
  }

  deleteSector(id: number) {
    this.deleteDialog = this.dialog.open(DeleteSectorDialogComponent, {
      hasBackdrop: false,
      panelClass: ['no-padding'],
      width: '350px',
    });
    this.deleteDialog
      .afterClosed()
      .pipe(filter(number => number))
      .subscribe(name => {
        this.sectorService.delete(id).subscribe(
          data => {
            this.getSectors();
          }
        );
      });
  }

  openAddDialog(selectedSector: Sector) {
    this.addDialog = this.dialog.open(AddUpdateSectorDialogComponent, {
      hasBackdrop: false,
      panelClass: ['no-padding'],
      width: '600px',
      minWidth: '250px',
      data: {
        dialogTitle: 'New Sector',
        isUpdated: false,
        selectedSector,
      }
    });
    this.addDialog
      .afterClosed()
      .pipe(filter(sector => sector))
      .subscribe(sector => {
        sector.id = 0;
        if(sector.isActive === 'true')
          sector.isActive = true;
        else {
          sector.isActive = null;
        }
        this.sectorService.add(sector).subscribe(data => {
          this.getSectors();
        });
      });
  }

  openUpdateDialog(selectedSector: Sector) {
    this.updateDialog = this.dialog.open(AddUpdateSectorDialogComponent, {
      hasBackdrop: false,
      panelClass: ['no-padding'],
      width: '600px',
      minWidth: '250px',
      data: {
        dialogTitle: 'Update Sector',
        isUpdated: true,
        selectedSector,
      }
    });
    this.updateDialog
      .afterClosed()
      .pipe(filter(sect => sect))
      .subscribe(sector => {
        if(sector.isActive === 'true')
          sector.isActive = true;
        else{
          sector.isActive = null;
        }
        this.sectorService.update(sector).subscribe(data => {
          this.getSectors();
        });
      });
  }

  ngOnChanges(): void {
      this.dataSource.data = this.sectors;
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
