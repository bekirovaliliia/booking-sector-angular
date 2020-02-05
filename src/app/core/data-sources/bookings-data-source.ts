import {Booking} from '../../shared/models/booking.model';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookingService} from '../services/booking.service';
import {catchError} from 'rxjs/operators';
import {BookingManagingDataService} from '../services/booking-managing-data.service';


export class BookingsDataSource implements DataSource<Booking> {

  private isApproved: boolean;
  private isExpired: boolean;
  private areTournaments: boolean;

  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  private countSubject = new BehaviorSubject<number>(0);

  public totalCount$ = this.countSubject.asObservable();

  constructor(private bookingService: BookingService,
              private conditionsSource: BookingManagingDataService) {}

  connect(collectionViewer: CollectionViewer): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.bookingsSubject.complete();
    this.countSubject.complete();
  }

  loadBookings(pageIndex: number, pageSize: number, areTournaments: boolean) {

    this.getConditions();

    if (!this.areTournaments) {
      this.bookingService.getBookings(pageIndex, pageSize, this.isApproved, this.isExpired)
        .pipe(
          catchError(() => ([]))
        )
        .subscribe(pagedBookingList => {
          this.bookingsSubject.next(pagedBookingList.dtos);
          this.countSubject.next(pagedBookingList.totalCount);
        });
    } else if (this.areTournaments) {
      this.bookingService.getTournamentBookings(pageIndex, pageSize, this.isApproved, this.isExpired)
        .pipe(
          catchError(() => ([]))
        )
        .subscribe(pagedBookingList => {
          this.bookingsSubject.next(pagedBookingList.dtos);
          this.countSubject.next(pagedBookingList.totalCount);
        });
    }
  }

  getConditions() {
    this.conditionsSource.currentConditions.subscribe(
      conditions => {
        this.isApproved = conditions.isApproved,
          this.isExpired = conditions.isExpired;
      });

    this.conditionsSource.areTournament.subscribe(
      areTournament => this.areTournaments = areTournament);
  }
}
