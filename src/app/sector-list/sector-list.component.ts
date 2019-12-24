import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  constructor(private httpService: HttpClient) { }  
  sectors: object [];  
  ngOnInit() {  
    this.httpService.get('https://localhost:44393/api/sectors').subscribe(  
      data => {  
       this.sectors = data as object [];  
      }  
    );  
  } 

}
