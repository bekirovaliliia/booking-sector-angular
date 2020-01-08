import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  user: User;
  //!!!!!!!!!!!!!!!!!!!! testing p as a FormData, not a File
  p: FormData;
  id = 46;
  constructor(private userService: UserService,) { }
  getPhoto(){
    this.userService.getUserPhoto(this.id).subscribe(data=> this.p = data);
    console.log(this.p);
    //this.p.get('file');
          //return this.user.photo;
  }
  ngOnInit() {
    //this.getPhoto();
    
    //return this.userService.getUser(this.id).subscribe(data => this.user = data);

  }
  selectedFile: File
  public fileChange(files:any[]) {

    if (files && files.length > 0) {
     let file = files[0];
     let formData = new FormData();
     formData.append('file', file);
    // this.user.photo = formData;
     this.userService.updateUserPhoto(formData);
     }  

  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log(formData);
   // this.user.photo = this.selectedFile;
    this.userService.updateUserPhoto(formData);
    console.log(this.selectedFile);
   // console.log(this.user);
  }

}
