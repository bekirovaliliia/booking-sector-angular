import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../../shared/models/booking.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiURl = 'https://localhost:44393/api/bookings';
  public urlAddress: string = environment.urlAddress;
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getBookings(isApproved: boolean, isExpired: boolean): Observable<Booking[]> {
    if (!isExpired) {
      return this.http.get<Booking[]>(this.apiURl).pipe(
        map(booking => booking.filter(b => b.isApproved === isApproved)),
        map(booking => booking.filter(b => new Date(b.bookingStart).getTime() > Date.now()))
      );
    } else if (isExpired) {
      return this.http.get<Booking[]>(this.apiURl).pipe(
        map(booking => booking.filter(b => new Date(b.bookingStart).getTime() < Date.now()))
      );
    }
  }

  updateBooking(booking: Booking): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlAddress}bookings/${booking.id}?isApproved=${booking.isApproved}`, httpOptions);
  }


  getBookedTournaments(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.urlAddress}bookings/tournaments`)
      .pipe(
        map((data: Booking[]) =>
          data.map(
            (item: any) =>
              new Booking(item.id, item.tournamentId, this.datePipe.transform(item.bookingStart, 'MMM dd, yyyy'),
                this.datePipe.transform( item.bookingEnd, 'MMM dd, yyyy'),
                item.sectorId, item.userId,
              )
          )
        )
      );
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.urlAddress}bookings/${id}`)
      .pipe(
        map((item: Booking) =>
          new Booking(item.id, item.tournamentId, this.datePipe.transform(item.bookingStart, 'MMM dd, yyyy'),
            this.datePipe.transform( item.bookingEnd, 'MMM dd, yyyy'),
            item.sectorId, item.userId,
          )
        )
      );
  }

  deleteBooking(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}bookings/${id}`);

  }
}
