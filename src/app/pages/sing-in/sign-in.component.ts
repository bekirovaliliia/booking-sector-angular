import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  SignInForm: FormGroup;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.authService.logout();
    }
    this.SignInForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    const {login, password} = this.SignInForm.value;
    this.authService.login(login, password).subscribe();
  }
}
