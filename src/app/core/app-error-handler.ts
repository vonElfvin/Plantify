import {ErrorHandler} from '@angular/core';
/**
 * Created by Oscar Ek on 2017-07-21.
 */

export class AppErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.log(error);

  }
}
