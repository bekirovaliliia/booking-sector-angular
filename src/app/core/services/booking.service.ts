import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../../shared/models/booking.model';
import {Setting} from '../../shared/models/setting.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Tournament} from '../../shared/models/tournament';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiURl = 'http://localhost:44393/api/bookings';
  public urlAddress: string = environment.urlAddress;
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getBookings() {
    return this.http.get<Booking[]>(this.apiURl);
  }

  updateBooking(booking: Booking): Observable<any> {
    console.log(booking);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlAddress}bookings/tournaments/${booking.id}`, booking, httpOptions);
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
