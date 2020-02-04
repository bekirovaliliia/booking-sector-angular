import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingService } from './booking.service';
import { Sector } from 'src/app/shared/models/sector-model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookingSectorsDataService {

  private _selectedSectors : Sector[] = [];
  get selectedSectors() {
    return this._selectedSectors;
  }

  set selectedSectors(sectors: Sector[]) {
    this._selectedSectors = sectors;
  }

  private _selectedTournamentId : number;

  get selectedTournamentId() : number {
    return this._selectedTournamentId;
  }
  set selectedTournamentId(tournament) {
    this._selectedTournamentId = tournament;
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
    private bookingService: BookingService,
    private toastr: ToastrService
    ) { }

  renderMarkers(startDate, endDate): void {
    this.bookingService.filterByDate(startDate, endDate)
      .subscribe(
        data => {
        this.changeMarkers(data);
      });
  }

  selectSector(marker): void {
    if(!this.selectedSectors.includes(marker, 0)) {
      this.selectedSectors.push(marker as Sector);
    } else {
      this.toastr.error(`Sector ${ marker.number } is already selected.`, 'Error');
    }
  }

  clearAllSelectedSectors(): void {
    this.selectedSectors.length = 0;
  }

  changeMarkers(markers): void {
    this._markers.next(markers);
  }

  changeDateRange(startDate, endDate): void {
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
