import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../core/auth/firebase-auth.service';
import { Router } from '@angular/router';
import {FormControl, FormControlDirective, Validators} from '@angular/forms';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// import { movieIn } from '..router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})
export class LoginComponent implements OnInit {
  constructor(public firebaseAuthService: FirebaseAuthService, router: Router) { }
  email: string;
  password: string;
  passwordRepeat: string;
  state: '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)]);

  ngOnInit() {
  }

  submitLogin() {
    this.firebaseAuthService.emailLogin(this.email, this.password);
  }

  signUpSubmit() {
    this.firebaseAuthService.emailSignUp(this.email, this.password);
  }
}
