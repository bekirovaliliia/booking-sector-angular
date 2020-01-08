import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  user: User;
  id = 106;
  email: string;
  constructor(private userService: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
     ){  }

  ngOnInit() {
  }
  resetPassword(){
    this.userService.resetPass(this.email).subscribe();
    this.toastr.success("Check your email and set a new password");
    this.dialogRef.close();
  }

  

}
