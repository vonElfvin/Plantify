import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../core/auth/firebase-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayName: string;

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {

    this.firebaseAuthService.currentUserObservable.subscribe(
      res => {
        if (res) {
          console.log(res);
          this.displayName = res.displayName;
        }else {
          this.displayName = null;
        }
      }
    );
  }

}
