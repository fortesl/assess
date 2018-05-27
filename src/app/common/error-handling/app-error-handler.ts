import { ErrorHandler } from '@angular/core';
import { environment } from '../../../environments/environment';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (!environment.production) {
      alert('An unexpected Error Occurred');
      console.log(error);
    } else {
      console.log('Production errors should be logged to a server: ', error);
    }
  }
}
