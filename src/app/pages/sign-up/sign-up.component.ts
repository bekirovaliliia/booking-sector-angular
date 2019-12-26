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


  constructor(
    private userService: UserService
  ) {  }

  ngOnInit() {

  }
  signUp() {
    this.user.id = 1;
    //this.userService.insertUser(this.user).subscribe();

    alert('tut3');
  }


}
