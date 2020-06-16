import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../../shared/models/booking.model';
import {UserService} from '../../../../core/services/user.service';
import {UserDetails} from '../../../../shared/models/user-details.model';
import {finalize} from "rxjs/operators";
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

declare  var  require: any;
@Component({
  selector: 'app-booking-user-details',
  templateUrl: './booking-user-details.component.html',
  styleUrls: ['./booking-user-details.component.sass']
})
export class BookingUserDetailsComponent implements OnInit {

  defaultPhoto = require('../../../../shared/images/defaultPhoto.png');
  @Input() expandedElement: Booking | null;

  currentUser: UserDetails;
  loaded: boolean;
  photo : SafeUrl;
  isPhoto: boolean;
  constructor( private userService: UserService,
    private sanitizer: DomSanitizer,
        ) { }

  ngOnInit() {
    this.loaded = false;
    this.getUserDetails();
    this.getPhoto();
  }
  getUserDetails() {
    return this.userService.getUserDetails(this.expandedElement.userId).pipe(
      finalize(() => this.loaded = true)
    ).subscribe(data => {
      this.currentUser = data;
    });
  }


  getPhoto(){
    this.userService.getUser(this.expandedElement.userId).subscribe(data => { this.photo = data.photo;
     if(this.photo!=null)
     {
       this.isPhoto = false;
     }
     else{
       this.isPhoto = true;
     }});
   }
   transform(): SafeUrl {
    if(this.photo)
    {
      return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,` + this.photo);
    }
    else 
      return this.defaultPhoto;
  }
}
