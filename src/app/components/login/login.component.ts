import { Component, OnInit, HostBinding } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';


// import { movieIn } from '..router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  // animations [moveIn()],
  // host: {'[moveIn()]': ''}
})
export class LoginComponent implements OnInit {
  constructor(public firebaseAuthService: FirebaseAuthService, router: Router) { }
  email: string;
  password: string;
  state: '';

  ngOnInit() {
  }
}
