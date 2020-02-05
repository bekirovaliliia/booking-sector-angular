import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {BookingManagingDataService} from '../../../../core/services/booking-managing-data.service';

@Component({
  selector: 'app-tournament-checkbox',
  templateUrl: './tournament-checkbox.component.html',
  styleUrls: ['./tournament-checkbox.component.sass']
})
export class TournamentCheckboxComponent implements OnInit {

  areTournaments: boolean;

  constructor(private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
    this.conditionSource.setAreTournament(false);
  }

  onChange() {
    this.conditionSource.setAreTournament(this.areTournaments);
  }
}
