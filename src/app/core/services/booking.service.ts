import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../../shared/models/booking.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingsUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  updateBooking(booking: Booking): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.bookingsUrl}/${booking.id}`, booking, httpOptions);
  }

}
