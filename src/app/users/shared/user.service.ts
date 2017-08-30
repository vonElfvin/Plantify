import { Injectable } from '@angular/core';
import { FirebaseDatabaseService } from '../../core/firebase-database.service';
import { User } from './user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class UserService extends FirebaseDatabaseService<User> {
  basePath= 'users';

  currentUser: User;

  constructor(protected db: AngularFireDatabase, protected firebaseAuthService: FirebaseAuthService) {
    super(db);
    this.getCurrentUserObservable().subscribe(
      res => this.currentUser = res
    );

  }

  getCurrentUserObservable(): Observable<User> {
    return this.firebaseAuthService.currentUserObservable.switchMap(authState => {
      return  this.getItem(authState.uid);
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }



  getCurrentUserKeyObservable() {
    return this.firebaseAuthService.currentUserIdObservable;
  }

  updateUser(user: User, key?: string) {
    if (user.$key) {
      return this.updateItem(user.$key, user);
    }else {
      return this.updateItem(key, user);
    }

  }

}
