import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdComponent } from './ad/ad.component';
import { AdService } from './shared/ad.service';
import { AuthGuard } from '../core/auth/auth.service';
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
import {AdsRoutingModule} from './ads-routing.module';

@NgModule({
  imports: [
    AdsRoutingModule,
    CommonModule,
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdMenuModule, MdIconModule, MdCardModule,
    MdSidenavModule, MdListModule, MdInputModule, MdRadioModule, MdTabsModule, MdGridListModule,
    MdSlideToggleModule, // Material modules
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
  exports: [
    AdComponent,
    AdListComponent,
    AdCreateComponent,
    AdEditComponent
  ],
  providers: [
    AdService,
    AuthGuard
  ]
})
export class AdsModule { }
