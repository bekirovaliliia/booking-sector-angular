import { Component, OnInit, ViewChild, Input} from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingService} from '../../../core/services/booking.service';
import { MatDialog, MatDialogRef, MatTable, MatTableDataSource,  MatPaginator, MatSort} from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SectorService } from 'src/app/core/services/sector.service';
import {UserDataService} from 'src/app/core/services/user-data.service';


declare  var  require: any;
@Component({
  selector: 'app-actual-bookings-table',
  templateUrl: './actual-bookings-table.component.html',
  styleUrls: ['./actual-bookings-table.component.sass']
})
export class ActualBookingsTableComponent implements OnInit {
  imgCancel = require('../../../shared/images/cancel.png');
  imgApproved = require('../../../shared/images/approved.png');
  imgDeclined = require('../../../shared/images/declined.png');
  imgTrash = require('../../../shared/images/trash.png');
  dataSource = new MatTableDataSource<Booking>([]);
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
  this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, {static: false}) set MatSort(sort: MatSort){
    this.dataSource.sort = sort;
  }
  booking: Booking;
  @Input() isActual:boolean = false;
  hasBookings: boolean = false;
  bookingHeaders: string[];
  dtOptions: any = {};
  idToDelete: number;

  bookings: Booking[];
  constructor(private bookingService: BookingService, 
              private authService: AuthenticationService,
              private sectorService: SectorService,
              private dataService: UserDataService,) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      retrieve: true,
      select: true,
    };
    this.getBookings();
  }

  getBookings()
  {
    this.bookingService.getUserBookings(this.authService.getId(), this.isActual).subscribe(res => {
      this.bookings = res;
      this.bookingHeaders = ['delete', 'id', 'bookingStart', 'bookingEnd', 'sectorId', 'isApproved'];
      this.updateDataSource();
      if(this.bookings.length == 0){this.hasBookings = false;}
      else{this.hasBookings = true;}
    });
  }
  updateDataSource() 
  {
    this.bookings.forEach(element => {
       this.sectorService.getById(element.sectorId).subscribe(data=>{element.sectorId = data.number;});      
    });
    this.dataSource.data = this.bookings.reverse();
  }
  saveIdToDelete(id: number)
  {
    this.idToDelete = id;
  }

   delete()
  {
    this.bookingService.deleteBooking(this.idToDelete).subscribe(data=> this.getBookings());
  }
}
