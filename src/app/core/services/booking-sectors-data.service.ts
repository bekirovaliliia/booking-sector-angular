import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingService } from './booking.service';
import { Sector } from 'src/app/shared/models/sector-model';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingSectorsDataService {

  apiSectorsUrl: string = environment.urlAddress + '/sectors';

  private _selectedSectors : Sector[] = [];

  get selectedSectors() {
    return this._selectedSectors;
  }

  set selectedSectors(sectors: Sector[]) {
    this._selectedSectors = sectors;
  }

  private _markers = new BehaviorSubject<object []>(null);
  currentMarkers = this._markers.asObservable();

  private _fromDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentFromDate = this._fromDate.asObservable();

  get fromDate() {
    return this._fromDate.getValue();
  }

  private _toDate = new BehaviorSubject<any>(moment().format('YYYY-MM-DD'));
  currentToDate = this._toDate.asObservable();

  get toDate() {
    return this._toDate.getValue();
  }

  constructor(
    private bookingService: BookingService
    ) { }

  renderMarkers(startDate, endDate) {
    this.bookingService.filterByDate(startDate, endDate)
      .subscribe(
        data => {
        this.changeMarkers(data);
      });
  }

  selectSector(marker): void {
    this.selectedSectors.push(marker as Sector);
  }

  clearAllSelectedSectors() : void {
    this.selectedSectors.length = 0;
  }

  changeMarkers(markers) {
    this._markers.next(markers);
  }

  changeDateRange(startDate, endDate) {
    if (startDate != null || endDate != null) {
      this._fromDate.next(startDate);
      this._toDate.next(endDate);
      this.bookingService.filterByDate(startDate, endDate)
        .subscribe(
          data => {
          this.changeMarkers(data);
        });
        this.clearAllSelectedSectors();
    }
  }
}
