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
  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
  user: User;
  id = 46;
  old: Boolean = false;

  check: boolean = false;
  saveChanges(newPass: string){
    this.user.password = newPass;
    this.old = false;
    this.userService.updateUser(this.user).subscribe();
  }
  passMatch(pass: string, passConf: string): boolean
  {
     if(pass == passConf){
       return true;
     }
     else return false;
  }

  checkOldPassword(pass: string){
    return this.userService.checkPass(pass, this.id).subscribe(data=>this.old =data);
  }
  
  constructor(private userService: UserService){  }

     ngOnInit() {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
    }

}
