import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedInUser, userReset } from '../../models/logged-in-user';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.isLoggedInUser$ = this.afAuth.authState;
  }
  private _subscription: Subscription;
  isLoggedInUser$: Observable <firebase.User>;

  private _loggedInUser = userReset;

  get loggedInUser() {
    return this._loggedInUser;
  }

  setLoggedInUser(user: LoggedInUser) {
    this._loggedInUser = user;
  }

  loginWithGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl || '/');
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider())
      .then(user => {

      });
  }

  loginWithEmailPassword(credentials): Promise<any> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl || '/');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.username, credentials.password);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut()
      .then(() => {
        this._loggedInUser = userReset;
      });
  }

  createUser(credentials): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

}
