import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {FirebaseDatabaseService} from '../../services/firebase-database.service';
import {FirebaseAuthService} from '../../services/firebase-auth.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: any;

  constructor(public firebaseDatabaseService: FirebaseDatabaseService,
              public firebaseAuthService: FirebaseAuthService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.firebaseDatabaseService.getAds().subscribe(ads => {
      for (const ad of ads) {
        this.firebaseDatabaseService.getImageUrl(ad);
      }
      this.ads = ads;
    });
  }
}
