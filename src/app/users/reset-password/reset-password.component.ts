import { Component, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '@app/common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@app/common/services/user.service';
import { CustomValidators } from '@app/common/validators/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnDestroy, AfterViewChecked {
  form: FormGroup;
  loginFailed: string;
  private _subscription: Subscription;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router, private db: UserService, private cdr: ChangeDetectorRef) {
    this.form = fb.group({
      username: ['', [
        Validators.required,
        Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword1: ['', [Validators.required, Validators.minLength(6)]],
      newPassword2: ['', [
        Validators.required, Validators.minLength(6), CustomValidators.passwordMismatch]]
    });
   }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  get username() {
    return this.form.get('username');
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword1() {
    return this.form.get('newPassword1');
  }

  get newPassword2() {
    return this.form.get('newPassword2');
  }

  ngAfterViewChecked() {
    this.validatePassword();
    this.cdr.detectChanges();
  }

  private validatePassword() {
    if (this.newPassword1.value && this.newPassword2.value && this.newPassword1.value !== this.newPassword2.value) {
      this.newPassword2.setErrors({'passwordMismatch': true});
    }
  }

  submit(value) {
    this.loginFailed = '';
    this.auth.loginWithEmailPassword(value.login)
      .then(user => {
        this._subscription = this.db.get(user.uid)
        .subscribe(x => {
          if (x) {
            this.auth.loggedInUser = x;
            this.auth.loggedInUser.uid = user.uid;
          }

          const returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            localStorage.removeItem('returnUrl');
          }
        });
      })
      .catch(error => this.loginFailed = error.message);
  }

}
