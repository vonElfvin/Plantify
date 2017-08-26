import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from '../../services/firebase-database.service';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import { ViewChild } from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase-auth.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';

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
  selected = false;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService,
              private firebaseAuthService: FirebaseAuthService) {
    this.type = 'sell';

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 325;
    this.cropperSettings.croppedHeight = 325;
    this.cropperSettings.canvasWidth = 325;
    this.cropperSettings.canvasHeight = 325;
    this.cropperSettings.noFileInput = true;
    this.image = {};
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
    const file = (<HTMLInputElement>document.getElementById('image')).files[0];
    this.firebaseDatabaseService.createAd(ad, this.image.image, file.name.split('.')[1]);
  }

  print() {
    const selectedFile = (<HTMLInputElement>document.getElementById('image')).files[0];
    console.log(selectedFile.name.split('.')[1]);
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };
    myReader.readAsDataURL(file);
    this.selected = true;
  }
}
