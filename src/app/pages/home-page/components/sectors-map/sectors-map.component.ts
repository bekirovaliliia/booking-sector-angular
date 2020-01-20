import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sectors-map',
  templateUrl: './sectors-map.component.html',
  styleUrls: ['./sectors-map.component.css']
})
export class SectorsMapComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private bookingService: BookingService
    ) { }

  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];

  sectorNumber: any;
  startDate: any;
  endDate: any;

  previous: any;

  reverseMarker(marker, infoWindow) {
    this.dataService.selectSector(marker);
    infoWindow.close();
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  ngOnInit() {
    this.dataService.currentFromDate.subscribe(date => this.startDate = date);
    this.dataService.currentToDate.subscribe(date => this.endDate = date);
    this.dataService.currentMarkers.subscribe(markers => this.markers = markers);
    this.startDate = moment().format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.bookingService.filterByDate(this.startDate, this.endDate)
          .subscribe(data => this.markers = data as object[]);
  }
}
