import { SectorListComponent } from './sector-list/sector-list';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{
  title = 'my-app';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = [49.893429, 49.333333];
  lng = [23.484971, 23.454342];

  coordinates = new google.maps.LatLng(this.lat[0], this.lng[0]);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 12
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }
  constructor(private httpService: HttpClient) { }
}
