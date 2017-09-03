import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdComponent} from './ad/ad.component';
import {AdCreateComponent} from './ad-create/ad-create.component';
import {AdListComponent} from './ad-list/ad-list.component';
import {AuthGuard} from '../core/auth/auth.service';


const routes: Routes = [
  {path: 'annonser', component: AdListComponent},
  {path: 'skapa-annons', component: AdCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit-annons/:id', component: AdCreateComponent, canActivate: [AuthGuard]},
  {path: 'annons/:id', component: AdComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdsRoutingModule { }
