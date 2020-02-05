import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {BookingService} from '../../../../core/services/booking.service';
import {BookingManagingDataService} from '../../../../core/services/booking-managing-data.service';
import {BookingsDataSource} from '../../../../core/data-sources/bookings-data-source';
import {tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookingTableComponent implements OnInit, AfterViewInit {

  isApproved: boolean;
  isExpired: boolean;
  areTournaments = false;

  totalCount: number;
  dataSource: BookingsDataSource;
  displayedColumns = ['id', 'sectorId', 'startDate', 'endDate', 'actions'];

  expandedElement: any;

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;

  constructor(private bookingService: BookingService,
              private conditionSource: BookingManagingDataService) { }

  ngOnInit() {
    this.dataSource = new BookingsDataSource(this.bookingService, this.conditionSource);
    this.dataSource.loadBookings(0, 5, true);
    this.dataSource.totalCount$.subscribe(count => this.totalCount = count);
  }
  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadBookings())
    ).subscribe();

    this.conditionSource.currentConditions.subscribe(c => {
      this.paginator.pageIndex = 0;
      this.loadBookings();
    });
  }

  loadBookings() {
    this.dataSource.loadBookings(this.paginator.pageIndex, this.paginator.pageSize, this.areTournaments);
    }
    setAreTournaments() {
    this.conditionSource.setAreTournament(this.areTournaments = !this.areTournaments);
    }
}
