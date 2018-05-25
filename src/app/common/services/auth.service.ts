import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedInUser } from '../../models/logged-in-user';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.isLoggedInUser$ = this.afAuth.authState;
  }
  private _subscription: Subscription;
  isLoggedInUser$: Observable <firebase.User>;

  private _loggedInUser: LoggedInUser = {
    name: '',
    email: '',
    roles: []
    };

  get loggedInUser() {
    return this._loggedInUser;
  }

  setLoggedInUser(user: LoggedInUser) {
    this._loggedInUser = user;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl || '/');
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut()
      .then(() => {
        this._loggedInUser = {
          name: '',
          email: '',
          roles: []
          };
      });
  }

}
