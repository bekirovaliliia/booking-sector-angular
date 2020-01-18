import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  protected expectedRole: Role = Role.Admin;

  constructor(private service: AuthenticationService, private router: Router, private toast: ToastrService) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role == this.expectedRole) {
      return true;
    }
    this.toast.warning('Немає прав для доступу');
    this.router.navigate(['home']);
    return false;
  }
}