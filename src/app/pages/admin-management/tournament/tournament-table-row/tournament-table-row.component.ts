import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {Booking} from '../../../../shared/models/booking.model';
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
  @Input() bookedTournaments: Booking;
  imgCancel = require('../../../../shared/images/cancel.png');
  imgEdit = require('../../../../shared/images/edit.png');

  @Output() selected = new EventEmitter<{id: number, action: string}>();

  private num: number[];
  constructor() { }

  ngOnInit() {
  }
  select(id: number, action: string) {

    this.selected.emit({id,  action });


  }
}
