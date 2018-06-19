import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../../models/app-user';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  loginFailed: string;
  private _subscription: Subscription;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router, private db: UserService) {
    if (auth.loggedInUser.email) {
      router.navigate(['/']);
    } else {
      this.form = fb.group({
        login: fb.group({
          username: ['', [
            Validators.required,
            Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        }),
      });
    }
   }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  get username() {
    return this.form.get('login.username');
  }

  get password() {
    return this.form.get('login.password');
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
