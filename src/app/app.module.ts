import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileTextComponent } from './pages/profile-page/user-profile-text/user-profile-text.component';
import { PhotoComponent } from './pages/profile-page/photo/photo.component';
import { UserMenuComponent } from './pages/profile-page/user-menu/user-menu.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { ChangePasswordNewComponent } from './pages/profile-page/change-password-new/change-password-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { CustomRangesComponent } from './pages/home-page/components/datepicker/datepicker';
import { BookSectorFormComponent } from './pages/home-page/components/book-sector-form/book-sector-form.component';
import { SectorsMapComponent } from './pages/home-page/components/sectors-map/sectors-map.component';
import { NavigationBarComponent } from './shared/navbar/navbar.component';
import { MainSectionComponent } from './pages/home-page/components/main-section/main-section.component';
import { FormSectionComponent } from './pages/home-page/components/form-section/form-section.component';
import { DatePipe } from '@angular/common';
import { RouterModule} from '@angular/router';
import { DeleteDialogComponent } from './pages/admin-management/tournament/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './pages/admin-management/tournament/update-dialog/update-dialog.component';
import { FilterSectorsComponent } from './pages/home-page/components/filter-sectors/filter-sectors.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
    imports: [
        FormsModule,
        NgbModule,
        BrowserModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPasswordStrengthModule.forRoot(),
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBa84Oxrn7z7nvHdRCLjefhguJscTJSqbM'
        }),
        NgxDaterangepickerMd.forRoot(),
        MatDialogModule,
        RouterModule,
        AppRoutingModule,

    ],
  declarations: [
    AppComponent,
    UserProfileTextComponent,
    UserProfileTextComponent,
    PhotoComponent,
    ProfilePageComponent,
    UserMenuComponent,
    ChangePasswordNewComponent,
    CustomRangesComponent,
    BookSectorFormComponent,
    SectorsMapComponent,
    FilterSectorsComponent,
    NavigationBarComponent,
    MainSectionComponent,
    FormSectionComponent,
    HomePageComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    FilterSectorsComponent,
    FooterComponent
  ],
  exports: [

  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [DeleteDialogComponent, UpdateDialogComponent, ChangePasswordNewComponent]
})
export class AppModule { }
