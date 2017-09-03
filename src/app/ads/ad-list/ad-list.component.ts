import {Component, Input, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import 'firebase/storage';
import {Router} from '@angular/router';
import {AdService} from '../shared/ad.service';
import {Ad} from '../shared/ad';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../users/shared/user.service';
import 'rxjs/add/observable/combineLatest';


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  ads: Ad[];

  @Input()
  adsObs: Observable<Ad[]>;

  editable= false;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private adService: AdService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if (!this.adsObs) {
      this.adsObs = this.adService.getAdsWithUserAndImgUrl();
    }else {
      this.editable = true;
      this.adsObs = Observable.combineLatest(this.adsObs, this.userService.getItemsList()).map(data => {
          const ads = data[0];
          const users = data[1];
          for (const ad of ads){
            this.adService.getImageUrl(ad);
            for (const user of users){
              if (user.$key === ad.author) {
                ad.user = user;
              }
            }
          }
          return  ads;
        });
    }

    this.adsObs.subscribe(ads => {
      this.ads = ads;
    });
  }



  onAdClick(ad) {
    this.router.navigate([`/annons/${ad.$key}`]);
  }

  addFavorite($key) {
    console.log($key);
  }

  removeFavorite($key) {
    console.log($key);
  }

  shareAd($key) {
    console.log($key);
  }

  onEditClick(ad: Ad) {
    this.router.navigate(['edit-annons/' + ad.$key]);
  }
}
