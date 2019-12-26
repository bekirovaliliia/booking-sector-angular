import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const now = new Date();



@Component({
  selector: 'app-sectors-map',
  templateUrl: './sectors-map.component.html',
  styleUrls: ['./sectors-map.component.css']
})
export class SectorsMapComponent implements OnInit {

  minDate = { year: now.getFullYear(), month: now.getMonth() + 1 , day: now.getDate() };
  latitude = 49.886416;
  longitude = 23.493211;
  mapType = 'satellite';
  markers: object [];

  @Input()
  selected: any;
  
  constructor(private httpService: HttpClient) { }

  today(): string{
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
  }
  reserveMarket(sectorNumber: number){
    (<any>$('tagsInput')).tagsinput('add', 'some tag');
  }

  ngOnInit() {
    this.httpService.get(`http://localhost:44393/api/sectors/free?fromDate=${this.today()}&toDate=${this.today()}`)
      .subscribe(
        data => {
        this.markers = data as object [];
        }
    );
  }
}
