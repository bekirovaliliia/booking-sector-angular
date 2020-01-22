import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingService } from './booking.service';
import * as moment from 'moment';


const now = new Date();

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private sectorsId : number[] = [];
  private sectorNumber = new BehaviorSubject<number>(null);
  currentSectorNumber = this.sectorNumber.asObservable();

  private markers = new BehaviorSubject<object []>(null);
  currentMarkers = this.markers.asObservable();

  private startDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentStartDate = this.startDate.asObservable();

  private endDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentEndDate = this.endDate.asObservable();

  clearSelectedSectors: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private httpService: HttpClient,
    private bookingService: BookingService
    ) { }

  apiSectorsUrl: string = 'https://localhost:44393/api/sectors';

  showAllSectors(){
    this.httpService.get(this.apiSectorsUrl)
    .subscribe(
      data => {
        this.currentMarkers = data as Observable<object []>;
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

  set addSectorId(sectorId){
    if(sectorId != null){
      this.sectorsId.push(sectorId);
      console.log(this.sectorsId);
    }
  }

  get currentSectorsId(){
    return this.sectorsId;
  }

  changeMarkers(markers){
    this.markers.next(markers);
  }

  changeNumber(sectorNumber: number){
    this.sectorNumber.next(sectorNumber);
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
