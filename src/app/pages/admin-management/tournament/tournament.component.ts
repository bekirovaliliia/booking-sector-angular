import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.sass']
})
export class TournamentComponent implements OnInit {
  searchText: string;
  opened: boolean;
  filters: any;
  mode = new FormControl('side');
  constructor() { }

  ngOnInit() {
  }

}
