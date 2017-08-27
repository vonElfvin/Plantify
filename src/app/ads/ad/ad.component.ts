import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AdService} from '../shared/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  id: any;
  ad: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adService: AdService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.adService.getAd(this.id).subscribe(ad => {
      this.adService.getImageUrl(ad);
      this.ad = ad;
    });
  }
}
