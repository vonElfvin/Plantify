import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Ad} from './ad';
import {FirebaseDatabaseService} from '../../core/firebase-database.service';
import {UUID} from 'angular2-uuid';
import {UserService} from '../../users/shared/user.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdService extends FirebaseDatabaseService<Ad> {
  basePath= 'ads';

  constructor(protected db: AngularFireDatabase, protected userService: UserService) {
    super(db);

  }

  getAd(id): FirebaseObjectObservable<Ad> {
    return this.getItem(id);
  }

  getAds(): FirebaseListObservable<Ad[]> {
    return this.getItemsList();
  }

  createAd(ad, image: string): any {
    const user = this.userService.getCurrentUser();
    return this.createBase64Image(image, 'ad-images').then(snapshot => {
      ad.image_path = snapshot.metadata.fullPath;
      ad.author = user.$key;
      ad.profile_img_url = user.profileImgUrl;
      ad.date_time = this.getTimeStamp();
      this.userService.updateUser(user);
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


  getMyAds(): Observable<Ad[]> {
    return this.userService.getCurrentUserKeyObservable().switchMap(
      key => {
        return this.getItemsList(
          {
            orderByChild: 'author',
            equalTo: key
          }
        );
      }
    );
  }







}
