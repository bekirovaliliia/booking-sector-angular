import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../models/user-model';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { BookingSectorsDataService } from 'src/app/core/services/booking-sectors-data.service';
declare  var  require: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavigationBarComponent implements OnInit{
  defaultPhoto = require('../images/defaultPhoto.png');
  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private dataService: BookingSectorsDataService,
              ) {}
  user: User;
 
  ngOnInit(){
  }
   
  transform(): SafeUrl {
    if(this.dataService.user.photo){
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,` + this.dataService.user.photo);
    }
    else return this.defaultPhoto;
  }
  logout() {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isLoggedOut(): boolean {
    return !this.isLoggedIn;
  }

  get userLogin(): string {
    return this.authService.getLogin();
  }

  get isAdmin(): boolean {
    return (this.authService.getRole() == "Admin");
  }

  get isUser(): boolean {
    return (this.authService.getRole() == "User");
  }
}