import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManagementComponent } from './pages/admin-management/admin-management.component';
import { AdminManagementModule } from './pages/admin-management/admin-management.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {SignInComponent} from './pages/sing-in/sign-in.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';
import { SetNewPasswordComponent } from './pages/sing-in/set-new-password/set-new-password.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';

const routes: Routes = [
  { path: 'home', 
    component: HomePageComponent
  },

  { path: 'admin', 
    component: AdminManagementComponent,
    canActivate: [AdminGuard]
  },

  { path: 'profile', 
    component: ProfilePageComponent,
    canActivate: [UserGuard, AdminGuard]
  },

  { path: 'sign-in', 
    component: SignInComponent
  },

  { path: 'sign-up', 
    component: SignUpComponent
  },

  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full' 
  },

  { path: 'set-password', 
    component: SetNewPasswordComponent
  },
  
  { path: 'user-bookings', 
    component : UserBookingsComponent,
    canActivate: [UserGuard, AdminGuard]
  },
];



@NgModule({
  imports: [

    AdminManagementModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

