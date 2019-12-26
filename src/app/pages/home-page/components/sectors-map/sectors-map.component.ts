import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  
  
  constructor(private httpService: HttpClient) { }

  today(): string{

    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
    
  }
  reserveMarket(sectorNumber: number){
    (<any>$('tagsInput')).tagsinput('add', 'some tag');
  }

  ngOnInit() {
    this.httpService.get(`https://localhost:44393/api/sectors/free?fromDate=2019-12-27&toDate=2019-12-28`)
      .subscribe(
        data => {
        this.markers = data as object [];
        }
    );
  }
}
