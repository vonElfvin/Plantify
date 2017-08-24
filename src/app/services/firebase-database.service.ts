import { Injectable } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseAuthService } from './firebase-auth.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Router} from '@angular/router';

@Injectable()
export class FirebaseDatabaseService {
  folder: string;
  ads: FirebaseListObservable<any[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, private firebaseAuthService: FirebaseAuthService, private router: Router ) {
    this.folder = 'ad-images';
    this.ads = this.angularFireDatabase.list('/ads', {
      query: {
        // orderByChild: 'date_time'
      }
    }) as FirebaseListObservable<Ad[]>;
  }

  createAd(ad) {
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const image_path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storageRef.child(image_path);
      iRef.put(selectedFile).then((snapshot) => {
        ad.image = selectedFile.name;
        ad.image_path = image_path;
        ad.author = this.firebaseAuthService.angularFireAuth.auth.currentUser.uid;
        ad.profile_img_url = this.firebaseAuthService.angularFireAuth.auth.currentUser.photoURL;
        ad.date_time = firebase.database.ServerValue.TIMESTAMP;
        this.router.navigate(['/annonser']);
        return this.ads.push(ad);
      });
    }
  }

  getAds() {
    return this.ads;
  }

  getImageUrl(ad) {
    const storageRef = firebase.storage().ref();
    storageRef.child(ad.image_path).getDownloadURL().then((url) => {
      ad.image_url = url;
    }).catch((error) => {
      console.log(error.message);
    });
  }
}

interface Ad {
  $key?: string;
  author?: string;
  name?: string;
  title?: string;
  description?: string;
  image_path?: string;
  image: string;
  type?: string;
  profile_img_url?: string;
  image_url?: string;
  date_time?: any;
}
