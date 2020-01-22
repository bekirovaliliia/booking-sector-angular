import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserAndAdminGuard implements CanActivate {
  protected firstExpectedRole: Role = Role.User;
  protected secondExpectedRole: Role = Role.Admin;

  constructor(private service: AuthenticationService, private router: Router, private toast: ToastrService) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role === this.firstExpectedRole || role === this.secondExpectedRole ) {
      return true;
    }
    this.toast.warning('Access denied');
    this.router.navigate(['home']);
    return false;
  }
}