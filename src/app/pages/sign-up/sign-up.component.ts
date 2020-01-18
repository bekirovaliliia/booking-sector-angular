import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserEmail } from '../../shared/models/user-email-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpValidators } from './sign-up.validators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: UserEmail;
  errorHandling = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.user = new UserEmail();
  }

  ngOnInit() {

    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['home']);
      this.toastr.warning("Щоб зареєструватись, спочатку потрібно вийти");
    }

    // @ts-ignore
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}'),
          SignUpValidators.validateName
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}'),
          SignUpValidators.validateName
        ]),
        number: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0]{1}[0-9]{9}'),
          SignUpValidators.validatePhone
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          SignUpValidators.validateEmail
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          SignUpValidators.validatePassword
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
      },
      {
        validators: [
          SignUpValidators.validatePasswords('password', 'repeatPassword')
        ]
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid

    if (this.registerForm.invalid) {
      return;
    }
    if (this.errorHandling === true) {
      this.toastr.error('Your number or email already exists! !', 'Oops :(');

      return;
    }

    this.user.lastname = this.registerForm.get(['lastName']).value;
    this.user.firstname = this.registerForm.get(['firstName']).value;
    this.user.email = this.registerForm.get(['email']).value;
    this.user.phone = this.registerForm.get(['number']).value;
    this.user.password = this.registerForm.get(['password']).value;


    this.userService.insertUser(this.user).subscribe(
      res => {
        this.toastr.success('Your registration was successful! Please check your email.', 'Congratulations!');
        this.router.navigate(['sign-in']);
      },
      err => {
        this.toastr.error('Your registration failed!', 'Oops :(');
      });
  }

  checkNumber() {
    if (this.registerForm.get(['number']).value.length === 10) {
      this.userService
        .getUserByNumber(this.registerForm.get(['number']).value)
        .subscribe(
          res => {
              this.toastr.error(
                'A user with this number already exists!',
                'Error!'
              );
              this.errorHandling = true;
            },
      error => {
              this.errorHandling = false;
            }
        );
    }
  }

  checkEmail() {
    if (this.registerForm.controls.email.errors === null) {
      this.userService
        .getUserByEmail(this.registerForm.get(['email']).value)
        .subscribe(res => {
          this.toastr.error(
            'A user with this email already exists!',
            'Error!'
          );
            this.errorHandling = true;
        },
          error => {
            this.errorHandling = false;
          }
        );
    }
  }
}
