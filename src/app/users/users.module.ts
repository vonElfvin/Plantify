import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './shared/user.service';
import {ProfileComponent} from './profile/profile.component';
import {AdsModule} from '../ads/ads.module';

@NgModule({
  imports: [
    CommonModule,
    AdsModule
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [UserService]
})
export class UsersModule { }
