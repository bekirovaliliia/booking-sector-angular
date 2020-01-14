import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user-model';
import {UserService} from '../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  user: User;
  id = 106;
  resetDialogRef: MatDialogRef<ResetPasswordComponent>;
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private toastr: ToastrService
   ) { }

  ngOnInit() {
  }


 openResetDialog() {
  this.resetDialogRef = this.dialog.open(ResetPasswordComponent, {
   hasBackdrop: false,
 });
 return this.resetDialogRef;
}
 
}
