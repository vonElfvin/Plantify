import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user';
import {AdService} from '../../ads/shared/ad.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  userIdObs;

  adsObs;

  constructor(private userService: UserService, private adService: AdService) { }

  ngOnInit() {

    this.userService.getCurrentUserObservable().subscribe(
      res => {
        this.currentUser = res;
      }
    );


    this.adsObs = this.adService.getMyAds();

    this.userIdObs = this.userService.getCurrentUserKeyObservable();
  }

}
