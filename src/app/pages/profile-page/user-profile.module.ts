import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordNewComponent } from './change-password-new/change-password-new.component';
import {PhotoComponent} from './photo/photo.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {UserProfileTextComponent} from './user-profile-text/user-profile-text.component';
import {ProfilePageComponent} from './profile-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [
    ChangePasswordNewComponent,
    PhotoComponent,
    UserMenuComponent,
    UserProfileTextComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatPasswordStrengthModule,
    NgxMaskModule,
  ],
  exports: [
    ChangePasswordNewComponent,
    PhotoComponent,
    UserMenuComponent,
    UserProfileTextComponent,
    ProfilePageComponent,
  ]
})
export class UserProfileModule { }
