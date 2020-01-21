import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass']
})
export class SetNewPasswordComponent implements OnInit {
  passwordStrength: number = 0;
  check: boolean = false;
  newPassword: string = "";
  newPasswordConfirm: string = "";
  checked = false;
  color:string = "primary";
  user: User;
  hide: boolean;
  
  constructor( private toastr: ToastrService,
               private userService: UserService,
               private router: Router,
               private authService: AuthenticationService) { }

  ngOnInit() {
    return this.userService.getUser(this.authService.getId()).subscribe(data => this.user = data);
  }
  showNotMeetConditions() {
    this.toastr.error('Your password must meet at least 2 of 5 conditions', 'Try again!');
  }
  showPasswordSaved() {
    this.toastr.success('Password changed successfully', 'You can sign in with new password');
  }
  onStrengthChanged(strength: number) 
  {
    this.passwordStrength = strength;
  }
  passMatch(): boolean
  {
     if((this.newPassword == this.newPasswordConfirm) 
         || this.newPassword == "")
      {
       return true;
      }
     else return false;
  }
  canSave(): boolean
  {
    if(this.passMatch() && this.newPassword != "")
      {
       return true;
      }
    else return false;
  }
  saveChanges()
  {
     if(this.passwordStrength<40)
    { 
      this.showNotMeetConditions();
    }
    else
    { 
          this.user.password = this.newPassword;
          this.checked = false;
          this.userService.updateUserPassword(this.user).subscribe();
          this.newPassword = "";
          this.newPasswordConfirm = "";
          this.showPasswordSaved();
          this.router.navigate(['/sign-in']);
    }
    }
  }

