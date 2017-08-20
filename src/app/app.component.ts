import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }
}
