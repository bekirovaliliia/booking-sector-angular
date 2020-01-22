import {Component, ErrorHandler, OnInit} from '@angular/core';
import {TournamentService} from '../../../core/services/tournament.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.sass'],
})
export class TournamentComponent implements OnInit {
  searchText: string;
  opened: boolean;
  filters: any;
  constructor() { }

  ngOnInit() {
  }

}
