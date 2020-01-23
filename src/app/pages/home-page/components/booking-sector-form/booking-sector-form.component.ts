import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserEmail } from 'src/app/shared/models/user-email-model';
import { Observable, forkJoin } from 'rxjs';
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
    private toastr: ToastrService,
    private userService: UserService
    ) { }

    onSubmit(formValues) {
      var userId;
      if(!this.isLoggedIn) {
        var userEmail: UserEmail = new UserEmail();
        userEmail.firstname = formValues.firstName;
        userEmail.lastname = formValues.lastName;
        userEmail.phone = formValues.phone;
        userEmail.email = "guest6@gmail.com"
        userEmail.password = '12345';
        this.userService.insertUser(userEmail).subscribe(user => userId = (user as UserEmail).id);
        console.log(userId);
      } else {
        userId = this.authentificationService.getId();
      }
      const fromDate = this.dataService.fromDate;
      const toDate = this.dataService.toDate;
      const selectedSectors = this.dataService.selectedSectors;
      const selectedTournamentId = this.dataService.selectedTournamentId;
      let booking: Booking;
      let bookedSectors : Observable<Booking>[] = [];
      for (const sector of selectedSectors) {
        booking = new Booking(0, selectedTournamentId, `${fromDate}`, `${toDate}`, sector.id, userId);
        bookedSectors.push(this.bookingSectorService.bookSector(booking));
      }  
      forkJoin(bookedSectors).subscribe(() => { 
        this.dataService.renderMarkers(fromDate, toDate);
        this.toastr.success('Selected sectors are booked.', 'Success');
      });       
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
