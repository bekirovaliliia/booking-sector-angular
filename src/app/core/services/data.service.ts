import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingService } from './booking.service';
import * as moment from 'moment';


const now = new Date();

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private sectorNumber = new BehaviorSubject<number>(null);
  currentSectorNumber = this.sectorNumber.asObservable();

  private sectorId = new BehaviorSubject<number>(null);
  currentSectorId = this.sectorId.asObservable();

  private markers = new BehaviorSubject<object []>(null);
  currentMarkers = this.markers.asObservable();

  private startDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentStartDate = this.startDate.asObservable();

  private endDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentEndDate = this.endDate.asObservable();

  constructor(
    private httpService: HttpClient,
    private bookingService: BookingService
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

  get fromDate(){
    return this.startDate.value;
  }

  get toDate(){
    return this.endDate.value;
  }

  renderMarkers(startDate, endDate){
    this.bookingService.filterByDate(startDate, endDate)
        .subscribe(
          data => {
          this.changeMarkers(data);
        })
  }

  changeSectorId(sectorId){
    this.sectorId = sectorId;
  }

  getCurrentSectorId(){  
    return this.sectorId.value;
  }

  changeMarkers(markers){
    this.markers.next(markers);
  }

  changeNumber(number: number){
    this.sectorNumber.next(number);
  }

  changeDateRange(startDate, endDate){
    if(startDate != null || endDate != null){
      this.startDate.next(startDate);
      this.endDate.next(endDate);
      this.bookingService.filterByDate(startDate, endDate)
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
