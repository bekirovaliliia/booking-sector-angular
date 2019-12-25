import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageModule} from './home-page/home-page.module';
import {UserProfileModule} from './profile-page/user-profile.module';
import {AdminManagementModule} from './admin-management/admin-management.module';
import {SignInComponent} from './sing-in/sign-in.component';

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    HomePageModule,
    UserProfileModule,
    AdminManagementModule,
  ],
  exports: [
    HomePageModule,
    UserProfileModule,
    AdminManagementModule,
    SignInComponent,
  ]
})
export class PagesModule { }
