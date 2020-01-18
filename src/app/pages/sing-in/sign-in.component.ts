import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SignUpValidators } from '../sign-up/sign-up.validators';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
 
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  SignInForm: FormGroup;
  resetDialogRef: MatDialogRef<ResetPasswordComponent>;

  constructor(private authService: AuthenticationService,
              private dialog: MatDialog,
              ) {}

  openResetDialog() {
    this.resetDialogRef = this.dialog.open(ResetPasswordComponent, {
     hasBackdrop: false,
   });
   return this.resetDialogRef;
  }

  ngOnInit() {
    this.SignInForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0]{1}[0-9]{9}'),
        SignUpValidators.validatePhone
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        SignUpValidators.validatePassword
      ])
    });
  }

  onSubmit() {
    const {login, password} = this.SignInForm.value;
    this.authService.login(login, password).subscribe();
  }
}
