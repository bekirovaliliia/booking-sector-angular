import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const now = new Date();

@Component({
  selector: 'app-sectors-map',
  templateUrl: './sectors-map.component.html',
  styleUrls: ['./sectors-map.component.css']
})
export class SectorsMapComponent implements OnInit {

  minDate = {year: now.getFullYear(), month: now.getMonth() + 1 , day: now.getDate()};
  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];
  constructor(private httpService: HttpClient) { }
  ngOnInit() {
    this.httpService.get('https://localhost:44393/api/sectors').subscribe(
      data => {
       this.markers = data as object [];
      }
    );
  }
}
