import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminManagementComponent} from './pages/admin-management/admin-management.component';
import {AdminManagementModule} from './pages/admin-management/admin-management.module';

const routes: Routes = [
  { path: 'admin', component: AdminManagementComponent}
];

@NgModule({
  imports: [

    AdminManagementModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

