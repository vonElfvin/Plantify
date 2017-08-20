import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { FirebaseDatabaseService } from './services/firebase-database.service';
import { environment } from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppErrorHandler } from './common/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdSidenavModule, MdListModule, MdCardModule, MdInputModule} from '@angular/material';
import 'hammerjs';

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdCreateComponent } from './components/ad-create/ad-create.component';
import { AdEditComponent } from './components/ad-edit/ad-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdComponent } from './components/ad/ad.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'annonser', component: AdListComponent},
  {path: 'skapa-annons', component: AdCreateComponent},
  {path: 'annons/:id', component: AdComponent},
  {path: 'logga-in', component: LoginComponent},
  {path: 'skapa-konto', component: SignUpComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdListComponent,
    AdCreateComponent,
    AdEditComponent,
    ProfileComponent,
    SettingsComponent,
    AdComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdCardModule,
    MdSidenavModule, MdListModule, MdInputModule, // Material modules
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    ReactiveFormsModule,
    FlashMessagesModule,
  ],
  providers: [
    // Services
    FirebaseAuthService,
    FirebaseDatabaseService,
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
