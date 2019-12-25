import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import {User} from '../shared/models/user-model';
import { OldPwdValidators } from './old-pwd.validators';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  form1: FormGroup; 
  
  constructor(fb: FormBuilder){
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required,OldPwdValidators.shouldBe1234],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }

  get oldPwd(){
    return this.form1.get('oldPwd');
  }

   get newPwd(){
    return this.form1.get('newPwd');
  }

   get confirmPwd(){
    return this.form1.get('confirmPwd');
  }


  user: User;  
  id = 4;
  ngOnInit() {
   
  }

  change_password: boolean = false;
  changePassword(){
    this.change_password = true;
  }

  help : boolean = false;
  helpBlock() {
   this.help = !this.help; 
  }
 

}
