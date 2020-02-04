import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingManagingDataService {

  private conditionSource = new BehaviorSubject<{isApproved: boolean, isExpired: boolean}>({isApproved: null, isExpired: false});
  private tournamentsSource = new BehaviorSubject<boolean>(null);

  currentConditions = this.conditionSource.asObservable();
  areTournament = this.tournamentsSource.asObservable();

  constructor() { }

  setConditions(isApproved: boolean, isExpired: boolean) {
    this.conditionSource.next({isApproved, isExpired});
  }
  setAreTournament(areTournaments: boolean) {
    this.tournamentsSource.next(areTournaments);
  }
}
