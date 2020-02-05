import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user-model';
import { Booking } from 'src/app/shared/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public user: User;
  public actualBookings: Booking[];
  public historyBookings: Booking[];
  constructor() { }
}
