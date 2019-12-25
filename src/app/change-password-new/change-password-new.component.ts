import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../shared/models/user-model';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-change-password-new',
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.sass'],
})
export class ChangePasswordNewComponent implements OnInit {
  changePasswordForm:FormGroup;
user: User;
id = 46;
passwordStrength: number = 0;
old: Boolean = false;
check: boolean = false;
oldPassword: string = "";
newPassword: string = "";
newPasswordConfirm: string = "";
checked = false;
visibilityForm: boolean = false;
visibilityButton: boolean = true;
  changeP()
  {
    this.visibilityForm = true;
    this.visibilityButton = false;
  }
  cancelP()
  {
    this.visibilityForm = false;
    this.visibilityButton = true;
  }
  onStrengthChanged(strength: number) 
  {
    this.passwordStrength = strength;
  }
  saveChanges()
  {
    if(this.passwordStrength<40)
      { 
        alert("Your password must meet at least 2 of 5 conditions");
      }
    else
      {
        this.user.password = this.newPassword;
        this.old = false;
        this.checked = false;
        this.userService.updateUser(this.user).subscribe();
        this.newPassword = "";
        this.newPasswordConfirm = "";
        alert("Password changed successfully");
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
  constructor(private userService: UserService){  }

     ngOnInit() 
    {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
    }

}
