import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/app/shared/models/user-model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  protected expectedRole: Role = Role.User;

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