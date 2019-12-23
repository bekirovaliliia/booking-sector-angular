import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../../shared/models/booking.model';
import {Setting} from '../../shared/models/setting.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiURl = 'https://localhost:44393/api/bookings';

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<Booking[]>(this.apiURl);
  }

  updateBooking(setting: Booking): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.apiURl}/${setting.id}`, setting, httpOptions);
  }

}
