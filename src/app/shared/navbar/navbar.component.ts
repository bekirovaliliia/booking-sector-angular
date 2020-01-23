import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Role } from '../models/role';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../models/user-model';
import { stringify } from 'querystring';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
declare  var  require: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavigationBarComponent implements OnInit{
  defaultPhoto = require('../images/defaultPhoto.png');
  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private sanitizer: DomSanitizer,) {}
  user: User;
 
  ngOnInit(){
    if(this.isLoggedIn){
    this.userService.getUser(this.authService.getId()).subscribe(data => this.user = data);
  }

  }
   
  transform(): SafeUrl {
    if(this.user.photo){
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,` + this.user.photo);
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