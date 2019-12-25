import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
declare  var  require: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-tournament-table-row]',
  templateUrl: './tournament-table-row.component.html',
  styleUrls: ['./tournament-table-row.component.sass']
})
export class TournamentTableRowComponent implements OnInit {
  @Input() tournament: Tournament;
  @Input() headers: string[];
  imgname = require('../../../../shared/images/cancel.png');
  constructor() { }

  ngOnInit() {
  }

}
