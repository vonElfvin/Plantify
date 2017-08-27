import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdComponent } from './ad/ad.component';
import { AdService } from './shared/ad.service';
import {
  MdButtonModule,
  MdCardModule, MdCheckboxModule,
  MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdRadioModule, MdSidenavModule,
  MdSlideToggleModule,
  MdTabsModule, MdToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdCardModule, MdSlideToggleModule,
    MdSidenavModule, MdListModule, MdInputModule, MdRadioModule, MdTabsModule, MdGridListModule, // Material modules
    FlexLayoutModule,
    FormsModule,
    ImageCropperModule
  ],
  declarations: [
    AdComponent,
    AdListComponent,
    AdCreateComponent,
    AdEditComponent
  ],
  providers: [
    AdService
  ]
})
export class AdsModule { }
