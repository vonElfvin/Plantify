import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {FirebaseAuthService} from './firebase-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canLogin = !!this.firebaseAuthService.authState;
    if (canLogin) {
      return true;
    }
    this.firebaseAuthService.redirectUrl = state.url;
    this.router.navigate(['logga-in']);
    return false;
  }
}
