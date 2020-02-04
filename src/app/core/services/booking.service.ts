import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Booking } from '../../shared/models/booking.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {PagedBookingList} from '../../shared/models/paged-booking-list.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly date = new Date();

  public urlAddress = `${environment.urlAddress}/bookings`;

  booking: Observable<Booking>;
  bookingPromise: Promise<Booking>;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) { }

    getAllBookings(): Promise<Booking[]> {
      return this.http.get<Booking[]>(`${this.urlAddress}`).toPromise().then
        ((data: Booking[]) =>
            data.map(
              (item: any) =>
                new Booking(item.id, item.tournamentId, item.bookingStart, item.bookingEnd, item.sectorId, item.userId, item.isApproved)
            )
          )
        ;
    }

    getBookings(pageIndex: number, pageSize: number, isApproved: boolean, isExpired: boolean): Observable<any> {
    if (isApproved === null) {
      return this.http.get<PagedBookingList>(`${this.urlAddress}/bookingPagedList`, {
        params: new HttpParams()
          .set('pageIndex', `${pageIndex}`)
          .set('pageSize', `${pageSize}`)
          .set('isExpired', String(isExpired))
      });
    } else {
      return this.http.get<PagedBookingList>(`${this.urlAddress}/bookingPagedList`, {
        params: new HttpParams()
          .set('pageIndex', `${pageIndex}`)
          .set('pageSize', `${pageSize}`)
          .set('isExpired', String(isExpired))
          .set('isApproved', String(isApproved))
    });
    }
    }
    getTournamentBookings(pageIndex: number, pageSize: number, isApproved: boolean, isExpired: boolean): Observable<any> {
      if (isApproved === null) {
        return this.http.get<PagedBookingList>(`${this.urlAddress}/tournamentsPagedList`, {
          params: new HttpParams()
            .set('pageIndex', `${pageIndex}`)
            .set('pageSize', `${pageSize}`)
            .set('isExpired', String(isExpired))
        });
      } else {
        return this.http.get<PagedBookingList>(`${this.urlAddress}/tournamentsPagedList`, {
          params: new HttpParams()
            .set('pageIndex', `${pageIndex}`)
            .set('pageSize', `${pageSize}`)
            .set('isExpired', String(isExpired))
            .set('isApproved', String(isApproved))
        });
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
