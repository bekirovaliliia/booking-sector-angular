import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../../shared/models/booking.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {SectorService} from '../services/sector.service';
=======
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../../shared/models/booking.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
>>>>>>> master

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public urlAddress: string = environment.urlAddress;

  booking: Observable<Booking>;

  constructor(
    private http: HttpClient, 
    private datePipe: DatePipe
    ) { }

<<<<<<< HEAD
  getBookings() {
    return this.http.get<Booking[]>(`${this.urlAddress}bookings`);
=======
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
>>>>>>> master
  }
  getUserBookings(id:number, isActual: boolean) {
    return this.http.get<Booking[]>(`${this.urlAddress}bookings/byUserId/${id}/${isActual}`).pipe(
      map((data: Booking[]) =>
        data.map(
          (item: any) =>
            new Booking(item.id, item.tournamentId, this.datePipe.transform(item.bookingStart, 'MMM dd, yyyy'),
              this.datePipe.transform( item.bookingEnd, 'MMM dd, yyyy'),
              item.sectorId, item.userId, item.isApproved,
            )
        )
      )
    );
  }

  updateBooking(booking: Booking): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    if(booking.isApproved === null){
      console.log(booking);
      console.log('perevirka ne taka vzhe i huinia');
      return this.http.put(`${this.urlAddress}bookings/${booking.id}`, httpOptions);
    return this.http.put(`${this.urlAddress}bookings/${booking.id}?isApproved=${booking.isApproved}`
                          , httpOptions);
    } else {
      console.log('im here')
      return this.http.put(`${this.urlAddress}bookings/${booking.id}?isApproved=${booking.isApproved}`
                          , httpOptions);
    }
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
  getBookingTournamentById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.urlAddress}bookings/tournaments/${id}`)
      .pipe(
        map((item: Booking) =>
          new Booking(item.id, item.tournamentId, this.datePipe.transform(item.bookingStart, 'MMM dd, yyyy'),
            this.datePipe.transform( item.bookingEnd, 'MMM dd, yyyy'),
            item.sectorId, item.userId,
          )
        )
      );
  }

  bookSector(booking: Booking)
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Booking>(`${this.urlAddress}bookings/`, booking, httpOptions);
  }

  deleteBooking(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}bookings/${id}`);
  }
}
