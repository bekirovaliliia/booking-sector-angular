import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileTextComponent } from './user-profile-text/user-profile-text.component';
import { PhotoComponent } from './photo/photo.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { ChangePasswordNewComponent } from './change-password-new/change-password-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { CustomRangesComponent } from './pages/home-page/components/datepicker/datepicker';
import { BookSectorFormComponent } from './book-sector-form/book-sector-form.component';
import { SectorsMapComponent } from './sectors-map/sectors-map.component';
import { NavigationBarComponent } from './navbar/navbar.component';
import { MainSectionComponent } from './pages/home-page/components/main-section/main-section.component';
import { FormSectionComponent } from './pages/home-page/components/form-section/form-section.component';
import { FooterComponent } from './pages/home-page/components/footer/footer.component';

import {RouterModule} from '@angular/router';
import { FilterSectorsComponent } from './filter-sectors/filter-sectors.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

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
        RouterModule,
        AppRoutingModule,
    ],
  declarations: [
    AppComponent,
    UserProfileTextComponent,
    UserProfileTextComponent,
    PhotoComponent,
    SectorListComponent,
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
    FooterComponent,
    HomePageComponent
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
