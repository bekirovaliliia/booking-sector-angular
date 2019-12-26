import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import {User} from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { ChangePasswordNewComponent } from '../change-password-new/change-password-new.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-profile-text',
  templateUrl: './user-profile-text.component.html',
  styleUrls: ['./user-profile-text.component.css']
})
export class UserProfileTextComponent implements OnInit {
  is_edit : boolean = false;
  change_password: boolean = false;
  updateDialogRef: MatDialogRef<ChangePasswordNewComponent>;
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
    alert("Changes saved successfully");
  }
  constructor(private userService: UserService,
              private dialog: MatDialog) { }  
  user: User;  
  id = 46;
  ngOnInit() {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
  }
  
  help : boolean = false;
  helpBlock() {
   this.help = !this.help; 
  }


}
