import { Component, OnInit } from '@angular/core';
import { BookingSectorsDataService } from 'src/app/core/services/booking-sectors-data.service';

@Component({
  selector: 'app-for-user',
  templateUrl: './for-user.component.html',
  styleUrls: ['./for-user.component.sass']
})
export class ForUserComponent implements OnInit {

  constructor(private dataService: BookingSectorsDataService) { }

  ngOnInit() {
    this.dataService.selectedTournamentId = null;
  }
}
