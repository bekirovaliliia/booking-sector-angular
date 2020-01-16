import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Token } from 'src/app/shared/models/Token';
=======
import { User } from '../../shared/models/user-model';
import {UserService} from '../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
>>>>>>> 88647405aa6dcbc19b655238c45d7bccd44b87ff

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
<<<<<<< HEAD
  SignInForm: FormGroup;

  constructor(private authService: AuthenticationService) {}
=======
  user: User;
  id = 106;
  resetDialogRef: MatDialogRef<ResetPasswordComponent>;
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private toastr: ToastrService
   ) { }
>>>>>>> 88647405aa6dcbc19b655238c45d7bccd44b87ff

  ngOnInit() {
    this.SignInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
  }

<<<<<<< HEAD
  onSubmit() {
    const {login, password} = this.SignInForm.value;
    this.authService.login(login, password).subscribe();
  }
}
=======

 openResetDialog() {
  this.resetDialogRef = this.dialog.open(ResetPasswordComponent, {
   hasBackdrop: false,
 });
 return this.resetDialogRef;
}
 
}
>>>>>>> 88647405aa6dcbc19b655238c45d7bccd44b87ff
