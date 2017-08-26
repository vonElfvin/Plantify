import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService} from '../../services/firebase-database.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
              private firebaseDatabaseService: FirebaseDatabaseService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseDatabaseService.getAd(this.id).subscribe(ad => {
      this.firebaseDatabaseService.getImageUrl(ad);
      this.ad = ad;
    });
  }
}
