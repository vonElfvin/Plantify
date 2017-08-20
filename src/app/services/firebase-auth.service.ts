import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class FirebaseAuthService {
  error: any;
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private location: Location,
              private flashMessagesService: FlashMessagesService) {
    this.user = afAuth.authState;
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      console.log(success);
      this.location.back();
    }).catch((error) => {
      console.log(error.message);
      this.error = error;
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
      console.log(success);
      this.location.back();
    }).catch((error) => {
      console.log(error.message);
      this.error = error;
    });
  }

  loginEmailAndPassword(formData) {
    if (formData.valid) {
      console.log(formData.value.email);
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
          console.log(success);
          this.location.back();
        }).catch((error) => {
        console.log(error);
      });
    }
  }

  signUpEmailAndPassword(email, password) {
    console.log(email);
    this.afAuth.auth
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
    this.afAuth.auth.signOut();
  }
}
