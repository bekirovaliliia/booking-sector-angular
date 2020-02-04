import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-filter-sectors',
  templateUrl: './filter-sectors.component.html',
  styleUrls: ['./filter-sectors.component.css']
})
export class FilterSectorsComponent implements OnInit {
  public selection = 'user';
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
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
    return (this.authService.getRole() === 'Admin');
  }

  get isUser(): boolean {
    return (this.authService.getRole() === 'User');
  }
}
