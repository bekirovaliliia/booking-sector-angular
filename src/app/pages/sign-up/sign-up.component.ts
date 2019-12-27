import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../shared/models/user-model';
import {UserEmail} from "../../shared/models/user-email-model";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
user: UserEmail;
userData: User;
number = '';
email = '';
lastName = '';
firstName = '';
password = '';
passwordRepeat = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.user = new UserEmail();
  }

  ngOnInit() {}

  signUp() {
   this.user.lastname = this.lastName;
    this.user.firstname = this.firstName;
    this.user.email = this.email;
    this.user.phone = this.number;
    this.user.password = this.password;


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
    if(this.number.length > 9){
      this.userService.getUserByNumber(this.number).subscribe(res => {
        this.toastr.error('A user with this number already exists!', 'Error!');
        this.number = '';
    });
  }
}



}
