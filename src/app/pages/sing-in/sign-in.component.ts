import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpValidators } from '../sign-up/sign-up.validators';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  SignInForm: FormGroup;
  resetDialogRef: MatDialogRef<ResetPasswordComponent>;
  email: string;
  hash: string;
  show: boolean;
  faEyeSlash =  faEyeSlash;
  faEye = faEye;

  constructor(private authService: AuthenticationService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private userService: UserService,
              private toastr: ToastrService,
              public router: Router
              ) {}

  openResetDialog() {
    this.resetDialogRef = this.dialog.open(ResetPasswordComponent, 
      { hasBackdrop: false,});
    return this.resetDialogRef;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      this.toastr.warning('To sign in you first need to sign out');
    }

    // Email Confirm
    if (this.route.snapshot.params.email  && this.route.snapshot.params.hash) {
      this.email = this.route.snapshot.params.email;
      this.hash = this.route.snapshot.params.hash;

      if (this.email !== '' && this.hash !== '') {
        this.confirmEmail();
      }
    }


    this.SignInForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        SignUpValidators.validatePhone
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onSubmit() {
    if (this.SignInForm.invalid) {
      return;
    }

    const {login, password} = this.SignInForm.value;
    this.authService.login(login, password).subscribe();
  }

  get f() {
    return this.SignInForm.controls;
  }


  private confirmEmail() {
    this.userService
        .confirmEmail(this.email, this.hash)
        .subscribe(
          result => {
            this.toastr.success(
              `${result}, you can successfully login!`,
              'Your email has been successfully verified'
            );
            },
      error => {
         if (error.status === 404) {
           this.toastr.error(
             'There is no user with this mail',
             'Error!'
           );
        } else if (error.status === 409) {
          this.toastr.error(
            `Email: ${error.error} is already verified`,
            'Error!'
          );
        } else if (error.status === 400) {
          this.toastr.error(
            'Verification error',
            'Error!'
          );
        }
      }
        );




  }
}
