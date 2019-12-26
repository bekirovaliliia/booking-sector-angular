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
    
  ngOnInit() {
   
  }

}
