import { Component, OnInit } from '@angular/core';
import {Sector} from '../../../shared/models/sector.model';
import {SectorService} from '../../../core/services/sector.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  constructor(private httpService: SectorService) { }
  sectors$: Sector[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      responsive: true
    };
    this.httpService.getSectors().subscribe(data => {
      this.sectors$ = data;
      this.dtTrigger.next();
    });
  }

  changeSectorActivity(sector: Sector) {
    this.httpService.changeSectorActivity(sector).subscribe();
  }
}
