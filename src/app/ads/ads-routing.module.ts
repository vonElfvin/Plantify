import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdComponent} from './ad/ad.component';
import {AdCreateComponent} from './ad-create/ad-create.component';
import {AdListComponent} from './ad-list/ad-list.component';


const heroesRoutes: Routes = [
  {path: 'annonser', component: AdListComponent},
  {path: 'skapa-annons', component: AdCreateComponent},
  {path: 'annons/:id', component: AdComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdsRoutingModule { }
