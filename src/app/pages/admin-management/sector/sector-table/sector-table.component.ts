import { Component, OnInit, Input } from '@angular/core';
import { Sector } from '../../../../shared/models/sector-model';
import { SectorService } from '../../../../core/services/sector.service';
import {Subject} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sector-table',
  templateUrl: './sector-table.component.html',
  styleUrls: ['./sector-table.component.sass']
})
export class SectorTableComponent implements OnInit {
  @Input() sectors: Sector[];
  sector: Sector;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  sectorHeaders: string[];

  constructor( private sectorService: SectorService ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      retrieve: true,
      select: true,
    };

    this.getSectors();
  }

  getSectors() {
    this.sectorService.getSectors().subscribe(res => {
      this.sectors = res;
      this.sectorHeaders = (this.sectors && this.sectors.length > 0) ? Object.keys(this.sectors[0]) : [];
      this.dtTrigger.next();
    });
  }
}
