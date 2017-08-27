import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO:Page notFoundComponent
// import { PageNotFoundComponent } from './not-found.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'logga-in', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
