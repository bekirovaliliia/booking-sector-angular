import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
//import {sleep} from 'sleep-ts';

declare  var  require: any;
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  defaultPhoto = require('../../../shared/images/defaultPhoto.png');
  user: User;
  id = 46;
  selectedFile: File;
  constructor(private userService: UserService,
              private sanitizer:DomSanitizer,
              private toastr: ToastrService,) { }
  getPhoto(){
   this.userService.getUser(this.id).subscribe(data => this.user = data);
  }

  ngOnInit() {
    this.getPhoto();
  }
  transform(): SafeUrl {
    if(this.user.photo){
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,` + this.user.photo);
    }
    else return this.defaultPhoto;
  }

 
  async onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile.type!="image/jpeg")
    {
      this.toastr.error("Choose image");
    }
    else
      if (this.selectedFile.size>2097152) 
      {
        this.toastr.error("Size of file must be less than 2Mb");
      }
      else
      {
        let formData = new FormData();
        formData.append('file', this.selectedFile);
        console.log(this.selectedFile);
        this.userService.updateUserPhoto(formData);
     //   await sleep(5000);
        this.toastr.success("Your photo changed successfully!");
        this.getPhoto();
      }
  }

}
