import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../../shared/models/booking.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly date = new Date();

  public urlAddress = `${environment.urlAddress}/bookings`;

  booking: Observable<Booking>;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) { }

    getBookings(isApproved: boolean, isExpired: boolean): Observable<Booking[]> {

      this.date.setDate(this.date.getDate() - 1);

      if (!isExpired) {
        return this.http.get<Booking[]>(this.urlAddress).pipe(
          map(booking => booking.filter(b => b.isApproved === isApproved)),
          map(booking => booking.filter(b => new Date(b.bookingStart).getTime() > this.date.valueOf()))
        );
      } else if (isExpired) {
        return this.http.get<Booking[]>(this.urlAddress).pipe(
          map(booking => booking.filter(b => new Date(b.bookingStart).getTime() < this.date.valueOf()))
        );
      }
    }
  getUserBookings(id: number, isActual: boolean) {
    return this.http.get<Booking[]>(`${this.urlAddress}/byUserId/${id}/${isActual}`).pipe(
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
    if (booking.isApproved === null) {
      return this.http.put(`${this.urlAddress}/${booking.id}`, httpOptions);
    } else {
      return this.http.put(`${this.urlAddress}/${booking.id}?isApproved=${booking.isApproved}`
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

  filterByDate(startDate, endDate) {
    return this.http.get(`${environment.urlAddress}/sectors/free?fromDate=${startDate}&toDate=${endDate}`);
  }

  bookSector(booking: Booking): Observable<Booking>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Booking>(`${this.urlAddress}/`, booking, httpOptions);
  }

  deleteBooking(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}/${id}`, httpOptions);
  }
}
