import { Component, OnInit, HostBinding } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})
export class SignUpComponent implements OnInit {
  email: any;
  password: any;
  state: '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)]);

  constructor(public firebaseAuthService: FirebaseAuthService, router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.firebaseAuthService.signUpEmailAndPassword(this.email, this.password);
  }
}
