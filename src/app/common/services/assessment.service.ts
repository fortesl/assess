import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssessmentService {

  constructor(private db: AngularFireDatabase) { }

  private readonly _dbName = 'assessment';
  current;
  currentName: string;

  get(name): Observable<any> {
    this.currentName = name;
    return this.db.object(`${this._dbName}/${name}`).valueChanges();
  }

  create(name: string, assessment: any): Promise<any> {
    delete assessment.name;
    return this.db.object(`${this._dbName}/${name}`).update(assessment);
  }

  connect(name) {
    this.get(name)
      .subscribe(x => this.current = x);
  }
}
