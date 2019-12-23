import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import {User} from '../models/user-model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-profile-text',
  templateUrl: './user-profile-text.component.html',
  styleUrls: ['./user-profile-text.component.css']
})
export class UserProfileTextComponent implements OnInit {
  is_edit : boolean = false;
  change_password: boolean = false;
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
  constructor(private userService: UserService) { }  
  user: User;  
  id = 4;
  ngOnInit() {
    return this.userService.getUser(this.id).subscribe(data => this.user = data);
  }
  
  help : boolean = false;
  helpBlock() {
   this.help = !this.help; 
  }


}
