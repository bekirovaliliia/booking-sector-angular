import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminManagementComponent} from './pages/admin-management/admin-management.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {SignInComponent} from './pages/sing-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  {path: 'sign-in', component: SignInComponent},
  { path: 'admin', component: AdminManagementComponent},
  { path: 'user', component: ProfilePageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
