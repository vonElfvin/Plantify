import { Component, OnInit } from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import { ViewChild } from '@angular/core';
import {FirebaseAuthService} from '../../core/auth/firebase-auth.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
import {AdService} from "../shared/ad.service";

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})

export class AdCreateComponent implements OnInit {
  state: '';
  // For the form
  name: string;
  title: string;
  description: string;
  type: string;
  image: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  format: any;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private adService: AdService) {
    this.type = 'sell';

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
    const ad = {
      title: this.title,
      description: this.description,
      type: this.type
    };
    this.adService.createAd(ad, this.image.image);
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
}
