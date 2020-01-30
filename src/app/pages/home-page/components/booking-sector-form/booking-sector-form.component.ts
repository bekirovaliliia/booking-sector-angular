import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserEmail } from 'src/app/shared/models/user-email-model';
import { Observable, forkJoin } from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { first } from 'rxjs/operators';


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

    async onSubmit(formValues) {
      var userId;
      if (!this.isLoggedIn) {
        var userEmail: UserEmail = new UserEmail();
        userEmail.firstname = formValues.firstName;
        userEmail.lastname = formValues.lastName;
        userEmail.phone = formValues.phone;
        userEmail.email = `guest${Math.floor(Math.random() * 901)}@guest.com`;
        userEmail.password = 'guest12345';
        var newUser = await this.userService.insertUser(userEmail).pipe(first()).toPromise();
        userId = (newUser as UserEmail).id;
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
      this.clearFormValues(formValues);
    }

    //#TODO: This method doesn't work. Fix it!
    private clearFormValues(form): void { 
      for(var name in form.controls) {
        (<FormControl>form.controls[name]).updateValueAndValidity();
        form.controls[name].setErrors(null);
      }
    }

    get controls() : any {
      return this.bookingSectorForm.controls;
    }

    ngOnInit(): void {
      this.bookingSectorForm = this.formBuilder.group({
        firstName: ['', [Validators.required, 
                        Validators.minLength(3),
                        Validators.maxLength(30),
                        Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}')]],
        lastName: ['', [Validators.required, 
                        Validators.minLength(3),
                        Validators.maxLength(30),
                        Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}')]],
        phone: ['', [Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                    Validators.pattern('[0]{1}[0-9]{9}')]]
      });
      this.isLoggedIn = this.authentificationService.isLoggedIn();
    }
}
