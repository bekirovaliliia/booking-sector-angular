import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const now = new Date();

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sectorNumber = new BehaviorSubject<number>(null);
  currentSectorNumber = this.sectorNumber.asObservable();

  private dateRange = new BehaviorSubject<any>({startDate: now.toString(), endDate: now.toString()});
  currentDateRange = this.dateRange.asObservable();

  private markers = new BehaviorSubject<object []>(null);
  currentMarkers = this.markers.asObservable();

  constructor(private httpService: HttpClient) { }

  apiSectorsUrl: string = "https://localhost:44393/api/sectors";

  showAllSectors(){
    this.httpService.get(this.apiSectorsUrl)
    .subscribe(
      data => {
        this.currentMarkers = data as Observable<object []>;
        this.changeMarkers(this.currentMarkers);
      }
    ); 
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
      this.httpService.get(`${this.apiSectorsUrl}/free?fromDate=${dateRange.startDate.format('YYYY MM DD')}&toDate=${dateRange.endDate.format('YYYY MM DD')}`)
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
