import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/user-model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-change-password-new',
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.sass'],
})
export class ChangePasswordNewComponent implements OnInit {
  changePasswordForm:FormGroup;
  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
  user: User;
  id = 4;

  saveChanges(){
    this.userService.updateUser(this.user).subscribe();
  }
  passMatch(pass: string, passConf: string): boolean
  {
     if(pass == passConf){
       return true;
     }
     else return false;
  }

  constructor(private userService: UserService){  }

  changePassword(value){
      if(this.changePasswordForm.valid){
          console.log("Change password form valid");
      }
  }

   ngOnInit() {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
    }

}
