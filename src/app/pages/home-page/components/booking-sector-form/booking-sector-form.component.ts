import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { SectorService } from '../../../../core/services/sector.service';

@Component({
  selector: 'app-booking-sector-form',
  templateUrl: './booking-sector-form.component.html',
  styleUrls: ['./booking-sector-form.component.css']
})
export class BookingSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;
  sectorId: number;
  sectorNumber: any;
  booking: Booking;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private bookingSectorService: BookingService,
    private sectorService: SectorService
    ) { }

    clearSelectedSectors(){
      this.sectorNumber = null;
    }

    onSubmit(){
      var dateRange = this.dataService.getDateRange();
      this.sectorService.getSectorIdBySectorNumber(this.sectorNumber).subscribe(x => {
        this.booking = new Booking(0, null, `${dateRange.startDate}`, `${dateRange.endDate}`, x, 1);
        this.bookingSectorService.bookSector(this.booking).subscribe(x => console.log(x));
      });  
    }

    ngOnInit() {
      this.bookingSectorForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      });
      this.dataService.currentSectorNumber.subscribe(number => {
        this.sectorNumber = number;
      });
      
    }
}
