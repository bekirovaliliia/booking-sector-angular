import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Role } from '../models/role';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../models/user-model';
import { stringify } from 'querystring';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavigationBarComponent {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

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