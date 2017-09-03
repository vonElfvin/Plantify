import { Component, OnInit } from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import { ViewChild } from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
import {AdService} from '../shared/ad.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ad} from '../shared/ad';
import {Http} from '@angular/http';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})

export class AdCreateComponent implements OnInit {

  freeDelivery = false;
  image: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  format: any;

  adId: string;
  ad: Ad;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private adService: AdService,
              private router: Router,
              private route: ActivatedRoute,
              private http: Http) {

    this.adId = this.route.snapshot.params['id'];

    if (this.adId) {
      this.adService.getAd(this.adId).subscribe(
        res => this.ad = res,
        err => console.log(err));
    }else {
      this.ad = new Ad();
    }


    this.ad.type = 'sell';

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = '#444444';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 3;
    this.image = {};
  }

  ngOnInit() {
  }

  createAd() {

    this.adService.createAd(this.ad, this.image.image).then(() => {
      this.router.navigate(['/annonser']);
    }).catch((error) => {
      console.log(error);
    });
  }

  fileChangeListener($event) {

    const image: any = new Image();
    const file: File = $event.target.files[0];


    this.format = file.name.split('.')[1];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };
    myReader.readAsDataURL(file);
  }

  resetDeliveryCost() {
    this.ad.deliveryCost = null;
  }

  resetPrice() {
    this.ad.price = null;
  }


  // downloadFile(url: string) {
  //   this.http.get(
  //     url).subscribe(
  //     (response) => {
  //       const mediaType = 'image/jpeg';
  //       const blob = new Blob([response._body], {type: mediaType});
  //       const filename = 'test.pdf';
  //       file new File([blob], filename);
  //
  //     });
  // }

}
