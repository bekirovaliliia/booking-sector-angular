import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  user: User;
  email: string="";
  constructor(private userService: UserService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<ResetPasswordComponent>,
             ){  }

  ngOnInit() {
  }
  resetPassword()
  {
    if(this.email == "")
    {
        this.toastr.error("Enter your email");
    }
    else
    {
    this.userService.resetPass(this.email).subscribe();
    this.toastr.success("Check your email");
    this.email = "";
    this.dialogRef.close();
    }
  }

  cancelP()
  {
    this.email="";
    this.dialogRef.close();
  }

  

}
