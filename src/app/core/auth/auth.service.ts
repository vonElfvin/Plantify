import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {FirebaseAuthService} from './firebase-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return Observable.from(this.firebaseAuthService.angularFireAuth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate([ '/logga-in' ]);
        }
      });
  }

}
