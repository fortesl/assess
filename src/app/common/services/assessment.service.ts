import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AssessmentService {

  constructor(private db: AngularFireDatabase, private auth: AuthService, private router: Router) { }

  private readonly _dbName = 'assessment';
  currentName: string;

  get(name): Observable<any> {
    if (!this.auth.loggedInUser.email) {
      this.router.navigate(['/']);
      return null;
    } else if (name) {
      this.currentName = name;
      return this.db.object(`${this._dbName}/${name}`).valueChanges();
    }
    return null;
  }

  create(name: string, assessment: any): Promise<any> {
    delete assessment.name;
    return this.db.object(`${this._dbName}/${name}`).update(assessment);
  }

}
