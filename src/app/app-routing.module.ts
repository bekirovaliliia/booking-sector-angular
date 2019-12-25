import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminManagementComponent} from './pages/admin-management/admin-management.component';
import {AdminManagementModule} from './pages/admin-management/admin-management.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'admin', component: AdminManagementComponent},
  
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

