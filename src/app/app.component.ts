import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { FirebaseAuthService } from './core/auth/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(mdIconRegistry: MdIconRegistry, public firebaseAuthService: FirebaseAuthService) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
