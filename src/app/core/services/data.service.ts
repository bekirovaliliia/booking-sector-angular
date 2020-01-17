import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SectorService } from './sector.service';


const now = new Date();

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private sectorNumber = new BehaviorSubject<number>(null);
  currentSectorNumber = this.sectorNumber.asObservable();

  private dateRange = new BehaviorSubject<any>({startDate: now.toString(), endDate: now.toString()});
  currentDateRange = this.dateRange.asObservable();

  private markers = new BehaviorSubject<object []>(null);
  currentMarkers = this.markers.asObservable();

  private startDate: string;
  private endDate: string;
  private sectorId;

  constructor(
    private httpService: HttpClient,
    private sectorService: SectorService
    ) { }

  apiSectorsUrl: string = "https://localhost:44393/api/sectors";

  showAllSectors(){
    this.httpService.get(this.apiSectorsUrl)
    .subscribe(
      data => {
        this.currentMarkers = data as Observable<object []>;
        this.currentMarkers.forEach(m => m)
        this.changeMarkers(this.currentMarkers);
      }
    ); 
  }

  getDateRange(){
    this.startDate = this.dateRange.value.startDate.format('YYYY-MM-DD');
    this.endDate = this.dateRange.value.endDate.format('YYYY-MM-DD');

    return { startDate: this.startDate, endDate: this.endDate };
  }

  getCurrentSectorId(){
    return this.sectorId;
  }
  changeMarkers(markers){
    this.markers.next(markers);
  }

  changeNumber(number: number){
    this.sectorNumber.next(number);
  }

  changeDateRange(dateRange){

    if(dateRange.startDate != null || dateRange.endSate != null){
      this.dateRange.next(dateRange);
      this.httpService.get(`${this.apiSectorsUrl}/free?fromDate=${dateRange.startDate.format('YYYY-MM-DD')}&toDate=${dateRange.endDate.format('YYYY-MM-DD')}`)
        .subscribe(
          data => {
          this.changeMarkers(data);
        })
    }
    else{
      this.showAllSectors();
    }
  }
}
