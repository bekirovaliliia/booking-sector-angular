import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../../shared/models/booking.model';
import {UserService} from '../../../../core/services/user.service';
import {UserDetails} from '../../../../shared/models/user-details.model';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-booking-user-details',
  templateUrl: './booking-user-details.component.html',
  styleUrls: ['./booking-user-details.component.sass']
})
export class BookingUserDetailsComponent implements OnInit {

  @Input() expandedElement: Booking | null;

  currentUser: UserDetails;
  loaded: boolean;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.loaded = false;
    this.getUserDetails();
  }
  getUserDetails() {
    return this.userService.getUserDetails(this.expandedElement.userId).pipe(
      finalize(() => this.loaded = true)
    ).subscribe(data => {
      this.currentUser = data;
    });
  }
}
