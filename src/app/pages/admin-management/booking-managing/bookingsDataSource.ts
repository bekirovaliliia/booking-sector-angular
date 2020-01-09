import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Booking} from '../../../shared/models/booking.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookingService} from '../../../core/services/booking.service';
import {finalize} from 'rxjs/operators';

export class BookingsDataSource implements DataSource<Booking> {

  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private bookingService: BookingService) {}

  connect(collectionViewer: CollectionViewer): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.bookingsSubject.complete();
    this.loadingSubject.complete();
  }

  getBookings() {
    this.loadingSubject.next(true);

    this.bookingService.getBookings()
      .pipe(finalize(() => this.loadingSubject.next(false) ))
      .subscribe(bookings => this.bookingsSubject.next(bookings));
  }
}
