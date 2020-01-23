import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import {sleep} from 'sleep-ts';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
declare  var  require: any;
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  defaultPhoto = require('../../../shared/images/defaultPhoto.png');
  user: User;
  selectedFile: File;

  get userId(): number {
    return this.authService.getId();
  }

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService,
              private authService: AuthenticationService) { }
  getPhoto(){
   this.userService.getUser(this.userId).subscribe(data => this.user = data);
  }
 async deletePhoto(){
   if(this.user.photo!=null)
   {
    this.userService.deleteUserPhoto(this.userId);
    await sleep(3000);
    this.toastr.success("Your photo deleted successfully!");
    this.getPhoto();
    }
    else
    {
      this.toastr.error("Your have not photo!");
    }
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
      this.toastr.error("Type of file must be jpeg");
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
        this.userService.updateUserPhoto(formData, this.authService.getId());
        await sleep(4000);
        this.toastr.success("Your photo changed successfully!");
        this.getPhoto();
      }
  }

}
