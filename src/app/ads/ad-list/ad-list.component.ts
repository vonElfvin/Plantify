import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import 'firebase/storage';
import {Router} from '@angular/router';
import {AdService} from '../shared/ad.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: any;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private adService: AdService,
              private router: Router ) { }

  ngOnInit() {
    this.adService.getAds().subscribe(ads => {
      for (const ad of ads) {
        this.adService.getImageUrl(ad);
      }
      this.ads = ads;
    });
  }

  onAdClick(ad) {
    this.router.navigate([`/annons/${ad.$key}`]);
  }
}
