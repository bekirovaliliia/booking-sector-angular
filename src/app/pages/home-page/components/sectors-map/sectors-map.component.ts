import { Component, OnInit } from '@angular/core';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-sectors-map',
  templateUrl: './sectors-map.component.html',
  styleUrls: ['./sectors-map.component.css']
})
export class SectorsMapComponent implements OnInit {

  constructor(
    private dataService: BookingSectorsDataService,
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService
    ) { }

  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];

  maxBookingSectors: number;

  previous: any;
  isLoggedIn: boolean;

  reverseMarker(marker, infoWindow): void {
    if(this.dataService.selectedSectors.length < this.maxBookingSectors) {
      this.dataService.selectSector(marker);
      infoWindow.close();
    }
  }

  clickedMarker(infoWindow): void {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.dataService.currentMarkers.subscribe(markers => this.markers = markers);
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');
    this.dataService.renderMarkers(startDate, endDate);
    this.settingsService.getSettingById(2).subscribe(s =>{
      this.maxBookingSectors = s.value;
    });
  }
}
