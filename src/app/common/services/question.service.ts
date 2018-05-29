import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import uuid from 'uuid';

@Injectable()
export class QuestionService {
  constructor(private db: AngularFireDatabase) { }
  
  private readonly _dbName = 'questions'

  get(query: any): Observable<any> {
    return this.db.list(this._dbName, query).valueChanges();
  }

  create(question: any): Promise<any> {
    const id = uuid();
    return this.db.object(`${this._dbName}/${id}`).set(question);
  }
}
