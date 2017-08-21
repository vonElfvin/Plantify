import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseDatabaseService {
  folder: string;
  ads: FirebaseListObservable<any[]>;

  constructor(private angularFireDatabase: AngularFireDatabase ) {
    this.folder = 'ad-images';
    this.ads = this.angularFireDatabase.list('/ads') as FirebaseListObservable<Ad[]>;
  }

  createAd(ad) {
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      const image_path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storageRef.child(image_path);
      iRef.put(selectedFile).then((snapshot) => {
        ad.image = selectedFile.name;
        ad.image_path = image_path;
        return this.ads.push(ad);
      });
    }
  }
}

interface Ad {
  $key?: string;
  name?: string;
  title?: string;
  description?: string;
  image_path?: string;
  type?: string;
}
