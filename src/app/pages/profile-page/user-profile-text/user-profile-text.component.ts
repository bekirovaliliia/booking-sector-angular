import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { ChangePasswordNewComponent } from '../change-password-new/change-password-new.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile-text',
  templateUrl: './user-profile-text.component.html',
  styleUrls: ['./user-profile-text.component.css']
})
export class UserProfileTextComponent implements OnInit {
  is_edit : boolean = false;
  change_password: boolean = false;
  updateDialogRef: MatDialogRef<ChangePasswordNewComponent>;
  showInfoEdited() {
    this.toastr.success('Changes saved successfully!');
  }
  openUpdateDialog() {
     this.updateDialogRef = this.dialog.open(ChangePasswordNewComponent, {
      hasBackdrop: false,
    });
    return this.updateDialogRef;
  }
  changePassword(){
    this.change_password = true;
  }
  isDisabled() : boolean{
    return !this.is_edit;
  }
   editInfo(){
    this.is_edit = true;
  }
  saveChanges(){
    this.userService.updateUser(this.user).subscribe();
    this.is_edit = false;
    this.showInfoEdited();
  }
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private toastr: ToastrService) { }  
  user: User;  
  id = 46;
  ngOnInit() {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
  }
}
