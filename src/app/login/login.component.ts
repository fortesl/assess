import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginFailed: string;

  constructor(fb: FormBuilder, private auth: AuthService, router: Router) {
    if (auth.loggedInUser.email) {
      router.navigate(['/']);
    } else {
      this.form = fb.group({
        login: fb.group({
          username: ['', [
            Validators.required,
            Validators.email]],
          password: ['', [Validators.required, Validators.minLength(4)]]
        }),
      });
    }
   }

  ngOnInit() {
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
      .catch(error => this.loginFailed = error.message);
  }

}
