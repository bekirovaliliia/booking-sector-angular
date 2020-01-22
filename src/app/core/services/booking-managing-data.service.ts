import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingManagingDataService {

  private conditionSource = new BehaviorSubject<{isApproved: boolean, isExpired: boolean}>({isApproved: null, isExpired: false});

  currentConditions = this.conditionSource.asObservable();

  constructor() { }

  setConditions(isApproved: boolean, isExpired: boolean) {
    this.conditionSource.next({isApproved, isExpired});
  }

}
