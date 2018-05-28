import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../../models/app-user';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AssessmentService } from './assessment.service';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private auth: AuthService, private assessment: AssessmentService) { }

  private readonly _userDbName = 'users';
  _subscription: Subscription;
  assessmentName: string;

  updateAppUser(user: firebase.User) {
    this._subscription = this.get(user.uid)
    .subscribe(x => {
      if (x) {
        this.auth.loggedInUser = x;
        if (x.assessments) {
          this.assessment.connect(x.assessments[0]);
          this.assessmentName = x.assessments[0];
        } else if (x.roles.includes('superadmin')) {
          this.assessment.connect('CUC-101');
          this.assessmentName = 'CUC-101';          
        }
      }
    });

    setTimeout(() => {
      if (this._subscription) {
        this._subscription.unsubscribe(); 
        this._subscription = undefined;
      }}, 5000);
    
  }

  saveNewUser(uid: string, user: AppUser) {
    this.db.object(`${this._userDbName}/${uid}`).set(user);
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object(`${this._userDbName}/${uid}`).valueChanges() as Observable<AppUser>;
  }

  getUsers(assessment: string): Observable<AppUser[]> {
    return this.db.list(this._userDbName).valueChanges() as Observable<AppUser[]>
  }
  
}
