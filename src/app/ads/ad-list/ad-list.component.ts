import {Component, Input, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import 'firebase/storage';
import {Router} from '@angular/router';
import {AdService} from '../shared/ad.service';
import {Ad} from '../shared/ad';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  ads: Ad[];

  @Input()
  adsObs: Observable<Ad[]>;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private adService: AdService,
              private router: Router) { }

  ngOnInit() {
    if (!this.adsObs) {
      this.adsObs = this.adService.getAds();
    }
    this.adsObs.subscribe(ads => {
      for (const ad of ads) {
        this.adService.getImageUrl(ad);
      }
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
}
