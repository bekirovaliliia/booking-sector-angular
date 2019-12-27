import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const now: Date = new Date();

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sectorNumber = new BehaviorSubject<number>(10);
  currentSectorNumber = this.sectorNumber.asObservable();

  private dateRange = new BehaviorSubject<any>({startDate: this.getTodayDate(), endDate: this.getTodayDate()});
  currentDateRange = this.dateRange.asObservable();

  getTodayDate(){
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
  }

  changeNumber(number: number){
    this.sectorNumber.next(number);
  }

  changeDateRange(dateRange){
    this.dateRange.next(dateRange);
  }

  constructor() { }
}
