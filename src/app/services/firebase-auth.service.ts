import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class FirebaseAuthService {
  error: any;
  user: Observable<firebase.User>;

  constructor(public angularFireAuth: AngularFireAuth,
              private router: Router,
              private location: Location) {
    this.user = angularFireAuth.authState;
  }

  loginGoogle() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      console.log(success);
      this.location.back();
    }).catch((error) => {
      console.log(error.message);
      this.error = error;
    });
  }

  loginFacebook() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
      console.log(success);
      this.location.back();
    }).catch((error) => {
      console.log(error.message);
      this.error = error;
    });
  }

  loginEmailAndPassword(email, password) {
    console.log(email);
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log(success);
        this.location.back();
      }).catch((error) => {
      console.log(error);
    });
  }

  signUpEmailAndPassword(email, password) {
    console.log(email);
    this.angularFireAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then((success) => {
      console.log(success);
      this.router.navigate(['logga-in']);
    }).catch((error) => {
      console.log(error.message);
      this.error = error;
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
