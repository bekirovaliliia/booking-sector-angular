import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  protected expectedRole: Role = Role.Admin;

  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    console.log(role);
    if (role == this.expectedRole) {
      return true;
    }
    this.router.navigate(['admin']);
    return false;
  }
}