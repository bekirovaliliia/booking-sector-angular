import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  protected expectedRole: Role = Role.User;

  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role == this.expectedRole) {
      return true;
    }
    this.router.navigate(['profile']);
    return false;
  }
}