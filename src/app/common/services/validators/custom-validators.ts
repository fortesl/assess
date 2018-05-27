import { FormControl, ValidationErrors, AsyncValidator } from '@angular/forms';

export class CustomValidators {
  static cannotContainDashes(control: FormControl): ValidationErrors | null {
    if ((control.value as string).indexOf('-') > -1) {
      return {
        cannotContainDashes: true
      };
    }
    return null;
  }

  static mustBeLuis(control: FormControl): Promise<ValidationErrors | null> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if ((control.value as string) !== 'luis') {
            resolve({
              mustBeLuis: true
            });
          }
          resolve(null);
        }, 3000);
      });
  }

}
