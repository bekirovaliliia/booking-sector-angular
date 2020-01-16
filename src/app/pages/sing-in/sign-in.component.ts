import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Token } from 'src/app/shared/models/Token';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  SignInForm: FormGroup;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.SignInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
  }

  onSubmit() {
    const {login, password} = this.SignInForm.value;
    this.authService.login(login, password).subscribe();
  }
}