import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../shared/models/user-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
user: User;
number: string;
email: string;
lastName: string;



  constructor(
    private userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit() {}

  signUp() {
    this.user.firstname = 'testFOOT';
    this.user.lastname = 'testFOOT';
    this.user.phone = '380111111111';
    this.user.id = 100;

    this.userService.insertUser(this.user).subscribe();

  }


}
