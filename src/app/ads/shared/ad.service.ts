import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Ad} from './ad';
import {FirebaseDatabaseService} from '../../core/firebase-database.service';
import {UUID} from 'angular2-uuid';

@Injectable()
export class AdService extends FirebaseDatabaseService<Ad> {
  basePath= 'ads';

  categories = [
    {value: 0, viewValue: 'Övrig'},
    {value: 1, viewValue: 'Begonia'},
    {value: 2, viewValue: 'Calathea'},
    {value: 3, viewValue: 'Elefantöra'},
    {value: 4, viewValue: 'Gullranka'},
    {value: 5, viewValue: 'Monstera'},
    {value: 6, viewValue: 'Oxalis'},
    {value: 7, viewValue: 'Palettblad'},
    {value: 8, viewValue: 'Pelargon'},
  ];

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
