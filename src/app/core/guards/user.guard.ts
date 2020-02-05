import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  protected expectedRole: Role = Role.User;

  constructor(private service: AuthenticationService, private router: Router, private toast: ToastrService) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role === this.expectedRole) {
      return true;
    }
    this.toast.warning('Access denied');
    this.router.navigate(['home']);
    return false;
  }
}