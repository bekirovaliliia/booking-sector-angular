import { AddUpdateSectorDialogComponent } from '../add-update-sector-dialog/add-update-sector-dialog.component';
import { DeleteSectorDialogComponent } from '../delete-sector-dialog/delete-sector-dialog.component';
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Sector } from '../../../../shared/models/sector-model';
import { SectorService } from '../../../../core/services/sector.service';
import { MatDialog, MatDialogRef, MatTable, MatTableDataSource,  MatPaginator, MatSort} from '@angular/material';
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

  addUpdateDialog: MatDialogRef<AddUpdateSectorDialogComponent>;
  deleteDialog: MatDialogRef<DeleteSectorDialogComponent>;

  dataSource = new MatTableDataSource<Sector>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
  this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort){
    this.dataSource.sort = sort;
  }

  constructor( private sectorService: SectorService,
               private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getSectors();
  }

  getSectors() {
    this.sectorService.getSectors().subscribe(res => {
      this.sectors = res;
      this.sectorHeader = (this.sectors && this.sectors.length > 0) ? Object.keys
      (this.sectors[0]) : [];
      this.dataSource.data = this.sectors;
    });
  }

  deleteSector(id: number) {
    this.deleteDialog = this.dialog.open(DeleteSectorDialogComponent, {
      hasBackdrop: false,
    });
    this.deleteDialog
      .afterClosed()
      .subscribe(name => {
        this.sectorService.delete(id).subscribe(
          data => {
         this.getSectors();
          }
        );
      });
  }

  openAddUpdateDialog(selectedSector: Sector, action: string){
    this.addUpdateDialog = this.dialog.open(AddUpdateSectorDialogComponent, {
      hasBackdrop: false,
      width: '500px',
      minWidth: '250px',
      data: {
         dialogTitle: (action === 'Add') ? 'New Sector' : 'Update Sector',
         isUpdated: (action === 'Add') ? false : true,
         selectedSector,
      }
    });
    this.addUpdateDialog
      .afterClosed()
      .subscribe(sector => {
        if (action === 'Add') {
          sector.id = 0;
          sector.isActive = true;
          this.sectorService.add(sector).subscribe(data => {
            this.getSectors();
          });
        } else if (action === 'Update') {
          sector.isActive = false;
          this.sectorService.update(sector).subscribe(data => {
            this.getSectors();
          });
        }
      });
}

ngOnChanges(): void {
      this.dataSource.data  = this.sectors;
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
