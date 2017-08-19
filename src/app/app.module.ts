import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdCreateComponent } from './components/ad-create/ad-create.component';
import { AdEditComponent } from './components/ad-edit/ad-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdComponent } from './components/ad/ad.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'annonser', component: AdListComponent},
  {path: 'skapa-annons', component: AdCreateComponent},
  {path: 'annons/:id', component: AdComponent}
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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    FirebaseService,
    AngularFireAuth,
    AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
