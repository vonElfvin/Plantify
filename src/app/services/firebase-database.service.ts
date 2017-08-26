import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseAuthService } from './firebase-auth.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Router} from '@angular/router';

@Injectable()
export class FirebaseDatabaseService {
  folder: string;
  ads: FirebaseListObservable<any[]>;
  ad: FirebaseObjectObservable<any>;

  constructor(private angularFireDatabase: AngularFireDatabase, private firebaseAuthService: FirebaseAuthService, private router: Router ) {
    this.folder = 'ad-images';
    this.ads = this.angularFireDatabase.list('/ads', {
      query: {
        // orderByChild: 'date_time'
      }
    }) as FirebaseListObservable<Ad[]>;
  }

  createAd(ad, image, format) {
    const storageRef = firebase.storage().ref();
    const selectedFile = image;
    const image_name = UUID.UUID() + '.' + format;
    const image_path = `/${this.folder}/${image_name}`;
    const iRef = storageRef.child(image_path);
    console.log(storageRef);
    console.log(image_path);
    iRef.putString(selectedFile, 'data_url').then((snapshot) => {
      ad.image = image_name;
      ad.image_path = image_path;
      ad.author = this.firebaseAuthService.angularFireAuth.auth.currentUser.uid;
      ad.profile_img_url = this.firebaseAuthService.angularFireAuth.auth.currentUser.photoURL;
      ad.date_time = firebase.database.ServerValue.TIMESTAMP;
      this.router.navigate(['/annonser']);
      return this.ads.push(ad);
    });
  }

  getAds() {
    return this.ads;
  }

  getAd(id) {
    return this.angularFireDatabase.object('/ads/' + id) as FirebaseObjectObservable<Ad>;
  }

  getImageUrl(ad) {
    const storageRef = firebase.storage().ref();
    storageRef.child(ad.image_path).getDownloadURL().then((url) => {
      ad.image_url = url;
      console.log(url);
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
