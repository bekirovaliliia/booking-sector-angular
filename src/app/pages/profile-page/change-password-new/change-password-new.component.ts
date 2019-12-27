import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-new',
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.sass'],
})
export class ChangePasswordNewComponent implements OnInit {
user: User;
id = 46;
passwordStrength: number = 0;
old: Boolean = false;
check: boolean = false;
oldPassword: string = "";
newPassword: string = "";
newPasswordConfirm: string = "";
checked = false;
color:string = "primary";
showNotMeetConditions() {
  this.toastr.error('Your password must meet at least 2 of 5 conditions', 'Try again!');
}
showPasswordSaved() {
  this.toastr.success('Password changed successfully');
}
   cancelP()
  {
    this.old= false;
    this.check= false;
    this.oldPassword = "";
    this.newPassword = "";
    this.newPasswordConfirm = "";
    this.checked = false;
  }
  onStrengthChanged(strength: number) 
  {
    this.passwordStrength = strength;
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
        this.old = false;
        this.checked = false;
        this.userService.updateUserPassword(this.user).subscribe();
        this.newPassword = "";
        this.newPasswordConfirm = "";
        this.showPasswordSaved();
        this.dialogRef.close();
      }
  }
  canSave(): boolean
  {
    if(this.passMatch() && this.newPassword != "")
      {
       return true;
      }
    else return false;
  }
  passMatch(): boolean
  {
     if((this.newPassword == this.newPasswordConfirm && this.old) 
         || this.newPassword == "")
      {
       return true;
      }
     else return false;
  }
  
  checkOldPassword()
  {
    if(this.oldPassword != "")
    {
    let res = this.userService.checkPass(this.oldPassword, this.id).subscribe(data=>this.old =data);
    return res;
    }
  }
  constructor(private userService: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ChangePasswordNewComponent>){  }

     ngOnInit() 
    {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
    }

}
