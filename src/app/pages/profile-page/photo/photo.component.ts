import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user-model';
import {UserService} from '../../../core/services/user.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import {sleep} from 'sleep-ts';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {BookingSectorsDataService} from 'src/app/core/services/booking-sectors-data.service';
declare  var  require: any;
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  defaultPhoto = require('../../../shared/images/defaultPhoto.png');
  selectedFile: File;
  hasPhoto: boolean = false;
  get userId(): number {
    return this.authService.getId();
  }
  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private dataService: BookingSectorsDataService,) { }
  ngOnInit() {
    this.getPhoto();
  }
  getPhoto(){
   this.userService.getUser(this.userId).subscribe(data => { this.dataService.user = data;
    if(this.dataService.user.photo!=null)
    {
      this.hasPhoto = false;
    }
    else{
      this.hasPhoto = true;
    }});
  }
  async deletePhoto(){
    if(this.dataService.user.photo!=null)
    {
      this.userService.deleteUserPhoto(this.userId);
      await sleep(2000);
      this.toastr.success("Your photo deleted successfully!");
      this.getPhoto();
    }
    else
    {
      this.toastr.error("Your have not photo!");
    }
  }
  transform(): SafeUrl {
    if(this.dataService.user.photo)
    {
      return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,` + this.dataService.user.photo);
    }
    else 
      return this.defaultPhoto;
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
        await sleep(2000);
        this.toastr.success("Your photo changed successfully!");
        this.getPhoto();
      }
  }
}
