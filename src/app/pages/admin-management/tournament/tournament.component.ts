import { Component, OnInit } from '@angular/core';

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
