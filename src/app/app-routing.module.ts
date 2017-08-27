import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO:Page notFoundComponent
// import { PageNotFoundComponent } from './not-found.component';
import {LoginComponent} from './login/login.component';
import {AdComponent} from './ads/ad/ad.component';
import {AdCreateComponent} from './ads/ad-create/ad-create.component';
import {AdListComponent} from './ads/ad-list/ad-list.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'logga-in', component: LoginComponent},
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
