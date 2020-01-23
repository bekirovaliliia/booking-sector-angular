import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-booking-sector-form',
  templateUrl: './booking-sector-form.component.html',
  styleUrls: ['./booking-sector-form.component.css']
})
export class BookingSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;
  isLoggedIn: boolean;
  count: number;

  constructor(
    private formBuilder: FormBuilder,
    public dataService: BookingSectorsDataService,
    private bookingSectorService: BookingService,
    private authentificationService: AuthenticationService,
    private toastr: ToastrService
    ) { }

    onSubmit(formValues) {
      const fromDate = this.dataService.fromDate;
      const toDate = this.dataService.toDate;
      const selectedSectors = this.dataService.selectedSectors;
      const selectedTournamentId = this.dataService.selectedTournamentId;
      let booking: Booking;
      let count = 0;
      const selectedSectorsCount = selectedSectors.length;
      for (const sector of selectedSectors) {
        booking = new Booking(0, selectedTournamentId, `${fromDate}`, `${toDate}`, sector.id, this.authentificationService.getId());
        this.bookingSectorService.bookSector(booking).subscribe(b => {
          this.dataService.renderMarkers(fromDate, toDate); // #TODO: Render markers too much. Change logic!
          count++;
          if (count === selectedSectorsCount) {
            this.toastr.success('Selected sectors are booked.', 'Success');
          }
        });
      }
      this.dataService.clearAllSelectedSectors();
    }

    ngOnInit() {
      console.log(this.dataService.selectedSectors);
      this.bookingSectorForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.isLoggedIn = this.authentificationService.isLoggedIn();
    }
}
