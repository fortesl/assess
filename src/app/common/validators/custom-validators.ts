import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordMismatch(password1: FormControl): null {
    return null;
  }
}

