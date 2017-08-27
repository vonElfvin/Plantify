import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseAuthService } from './core/auth/firebase-auth.service';
import { environment } from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppErrorHandler } from './core/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';


// Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdSidenavModule, MdListModule, MdCardModule, MdInputModule, MdRadioModule, MdTabsModule, MdGridListModule, MdSliderModule, MdSlideToggleModule } from '@angular/material';
import 'hammerjs';

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdListComponent } from './ads/ad-list/ad-list.component';
import { AdCreateComponent } from './ads/ad-create/ad-create.component';
import { AdEditComponent } from './ads/ad-edit/ad-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { AdComponent } from './ads/ad/ad.component';
import { LoginComponent } from './login/login.component';
import { AdsModule } from './ads/ads.module';
import {AppRoutingModule} from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    AdsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdCardModule, MdSliderModule, MdSlideToggleModule,
    MdSidenavModule, MdListModule, MdInputModule, MdRadioModule, MdTabsModule, MdGridListModule, // Material modules
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    ReactiveFormsModule,
    FlashMessagesModule,
  ],
  providers: [
    // Services
    FirebaseAuthService,
    // Imports
    AngularFireAuth,
    AngularFireDatabase,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
