import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminManagementComponent} from './pages/admin-management/admin-management.component';


const routes: Routes = [
  { path: 'admin-management', component: AdminManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
