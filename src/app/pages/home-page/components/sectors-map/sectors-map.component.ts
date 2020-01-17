import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../core/services/data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import * as moment from 'moment';

const now = new Date();

@Component({
  selector: 'app-sectors-map',
  templateUrl: './sectors-map.component.html',
  styleUrls: ['./sectors-map.component.css']
})
export class SectorsMapComponent implements OnInit {

  
  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];

  constructor(
    private httpService: HttpClient,
    private dataService: DataService,
    private bookingService: BookingService
    ) { }

  today(): string{
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }

  sectorNumber: any;
  startDate: any;
  endDate: any;

  previous: any;

  reverseMarker(marker, infowindow){
    this.dataService.setCurrentSectorId(marker.id);
    this.dataService.changeNumber(marker.number);
    infowindow.close();
  }

  clickedMarker(infowindow) {    
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow; 
  }

  filterByDate(){ 
    this.bookingService.filterByDate(this.startDate, this.endDate)
          .subscribe(data => this.markers = data as object[]);
  }

  ngOnInit() {
    this.dataService.currentSectorNumber.subscribe(number => this.sectorNumber = number);
    this.dataService.currentStartDate.subscribe(date => this.startDate = date);
    this.dataService.currentEndDate.subscribe(date => this.endDate = date);
    this.dataService.currentMarkers.subscribe(markers => this.markers = markers); 
    this.startDate = moment().format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');
    this.bookingService.filterByDate(this.startDate, this.endDate)
          .subscribe(data => this.markers = data as object[]);
  }
}
