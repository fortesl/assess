import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../../models/app-user';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './auth.service';
import { AssessmentService } from './assessment.service';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  private readonly _userDbName = 'users';
  _subscription: Subscription;

  updateAppUser(user: firebase.User) {
    this._subscription = this.get(user.uid)
    .subscribe(x => {
      if (x) {
        this.auth.loggedInUser = x;
        this.auth.loggedInUser.uid = user.uid;
      }
      this.auth.userLoginChecked = true;
    });

    setTimeout(() => {
      if (this._subscription) {
        this._subscription.unsubscribe();
        this._subscription = undefined;
      }}, 5000);

  }

  saveNewUser(uid: string, user: AppUser): Promise<any> {
    return this.db.object(`${this._userDbName}/${uid}`).set(user);
  }

  setUserAssessments(uid: string, assessments: string[]): Promise<any> {
    return this.db.object(`${this._userDbName}/${uid}/assessments`).set(assessments);
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object(`${this._userDbName}/${uid}`).valueChanges() as Observable<AppUser>;
  }

  getUsers(assessment: string): Observable<AppUser[]> {
    return this.db.list(this._userDbName, ref => ref.orderByKey()).valueChanges().
      map( (list) => {
        const users: AppUser[] = [];
        for (let idx = 0; idx < list.length; idx++) {
          if ((list[idx] as AppUser).assessments.includes(assessment)) {
            users.push(list[idx] as AppUser);
          }
        }
        return users;
       });
  }

}
