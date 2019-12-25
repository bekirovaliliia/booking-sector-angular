import { Component, OnInit } from '@angular/core';
import {Sector} from '../../../shared/models/sector.model';
import {SectorService} from '../../../core/services/sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  constructor(private httpService: SectorService) { }
  sectors$: Sector[];

  ngOnInit() {
    this.httpService.getSectors().subscribe(data => this.sectors$ = data);
  }

}
