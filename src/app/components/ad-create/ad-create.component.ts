import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from '../../services/firebase-database.service';


@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  name: string;
  title: string;
  description: string;
  type: string;
  image: any;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {
    this.type = 'sell';
  }

  ngOnInit() {
  }

  createAd() {
    const ad = {
      title: this.title,
      name: this.name,
      description: this.description,
      type: this.type
    };
    this.firebaseDatabaseService.createAd(ad);
  }
}
