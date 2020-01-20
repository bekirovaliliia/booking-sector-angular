import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';



@Component({
  selector: 'app-booking-sector-form',
  templateUrl: './booking-sector-form.component.html',
  styleUrls: ['./booking-sector-form.component.css']
})
export class BookingSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private bookingSectorService: BookingService,
    private authService: AuthenticationService
    ) { }

    onSubmit(formValues) {
      const fromDate = this.dataService.fromDate;
      const toDate = this.dataService.toDate;
      const selectedSectors = this.dataService.selectedSectors;
      let booking: Booking;
      for (const sector of selectedSectors) {
        booking = new Booking(0, null, `${fromDate}`, `${toDate}`, sector.id, 1);
        this.bookingSectorService.bookSector(booking).subscribe(b => {
          this.dataService.renderMarkers(fromDate, toDate); //#TODO: Render markers too much. Change logic!
        });
      }  
      this.dataService.clearSelectedSectors.emit();
    }

    ngOnInit() {
      this.bookingSectorForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
}
