import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import {UserService} from '../../core/services/user.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass'],
  providers: [UserService]
})
export class ProfilePageComponent implements OnInit {
  constructor(private httpService: HttpClient) { }  
    isProfile:boolean = true;
    isBookings:boolean = false;
  ngOnInit() {
   
  }
   profile(){
     this.isBookings= false;
     this.isProfile=true;
   }

   bookings(){
     this.isBookings = true;
     this.isProfile = false;
   }
}
