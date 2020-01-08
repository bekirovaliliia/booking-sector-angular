import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManagementComponent } from './pages/admin-management/admin-management.component';
import { AdminManagementModule } from './pages/admin-management/admin-management.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {SignInComponent} from './pages/sing-in/sign-in.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import { SetNewPasswordComponent } from './pages/profile-page/set-new-password/set-new-password.component';
import { ChangePasswordNewComponent } from './pages/profile-page/change-password-new/change-password-new.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'admin', component: AdminManagementComponent},
  { path: 'profile', component: ProfilePageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'set-password', component: SetNewPasswordComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full' },
];



@NgModule({
  imports: [

    AdminManagementModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

