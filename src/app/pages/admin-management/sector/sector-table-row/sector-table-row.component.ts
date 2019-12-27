import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sector } from '../../../../shared/models/sector-model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-sector-table-row]',
  templateUrl: './sector-table-row.component.html',
  styleUrls: ['./sector-table-row.component.sass']
})
export class SectorTableRowComponent implements OnInit {
  @Input() sector: Sector;
  @Input() headers: string[];

  @Output() selected = new EventEmitter<{id: number, action: string}>();

  private num: number[];
  constructor() { }

  ngOnInit() {
  }
  select(id: number, action: string) {
    this.selected.emit({id, action });
  }
}
