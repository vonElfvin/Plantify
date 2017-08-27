import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Ad} from './ad';
import {FirebaseDatabaseService} from '../../core/firebase-database.service';
import {UUID} from 'angular2-uuid';

@Injectable()
export class AdService extends FirebaseDatabaseService<Ad> {
  basePath= 'ads';

  getAd(id): FirebaseObjectObservable<Ad> {
    return this.getItem(id);
  }

  getAds(): FirebaseListObservable<Ad[]> {
    return this.getItemsList();
  }

  createAd(ad, image: string): any {
    return this.createBase64Image(image, 'ad-images').then(snapshot => {
      ad.image_path = snapshot.metadata.fullPath;
      ad.author = this.firebaseAuthService.currentUserId;
      ad.profile_img_url = this.firebaseAuthService.currentUser.photoURL;
      ad.date_time = this.getTimeStamp();
      return this.createItem(ad);
    });
  }

  getImageUrl(ad) {
    this.storageRef.child(ad.image_path).getDownloadURL().then((url) => {
      ad.image_url = url;
    }).catch((error) => {
      console.log(error.message);
    });
  }







}
