import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingService } from './booking.service';
import * as moment from 'moment';
import { Sector } from 'src/app/shared/models/sector-model';


@Injectable({
  providedIn: 'root'
})
export class DataService{

  apiSectorsUrl: string = 'https://localhost:44393/api/sectors';
  
  private _sectorsId : number[] = [];

  get sectorsId(){
    return this._sectorsId;
  }

  private sector = new BehaviorSubject<Sector>(null);
  currentSector = this.sector.asObservable();

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
    ) { 
      this.currentSector.subscribe(s => {
        if(s != null){
          this.sectorsId.push(s.id);
          console.log(this.sectorsId);
        }
      });
      this.clearSelectedSectors.subscribe(s => this._sectorsId = []);
    }

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

  changeSector(marker): void {
    this.sector.next(marker);
  }

  changeMarkers(markers){
    this.markers.next(markers);
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
