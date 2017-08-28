import { Injectable } from '@angular/core';
import {MdSnackBar, MdSnackBarConfig, MdSnackBarRef} from '@angular/material';

@Injectable()
export class FeedbackService {
  loginMessage = 'Du är inloggad.';
  logoutMessage = 'Du är utloggad.';
  loginRequiredMessage = 'Inlogg krävs.';
  differentPasswordsMessage = 'Lösenorden skiljer sig åt.';
  errorSnackBarConfig: MdSnackBarConfig = new MdSnackBarConfig();
  successSnackBarConfig: MdSnackBarConfig = new MdSnackBarConfig();

  constructor(private snackBar: MdSnackBar) {
    this.errorSnackBarConfig.extraClasses = ['error-snackbar'];
    this.errorSnackBarConfig.duration = 3000;
    this.successSnackBarConfig.extraClasses = ['success-snackbar'];
    this.successSnackBarConfig.duration = 3000;
  }

  openErrorSnackBar(message: string): MdSnackBarRef<any> {
    return this.snackBar.open(message, 'Stäng', this.errorSnackBarConfig);
  }

  openSuccessSnackBar(message: string): MdSnackBarRef<any> {
    return this.snackBar.open(message, 'Stäng', this.successSnackBarConfig);
  }
}
