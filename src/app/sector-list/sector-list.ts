import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { Component, OnInit } from '@angular/core';  
  
@Component({  
  selector: 'sector-list',  
  templateUrl: './sector-list.html' 
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
