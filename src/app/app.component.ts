import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];
  
  constructor(private httpService: HttpClient) { }
  ngOnInit() {  
    this.httpService.get('https://localhost:44393/api/sectors/free?fromDate=2019-12-21&toDate=2019-12-22').subscribe(  
      data => {  
       this.markers = data as object [];  
      } 
    );  
  }
}
