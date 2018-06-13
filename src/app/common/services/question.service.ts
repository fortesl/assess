import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {
  constructor(private db: AngularFireDatabase) { }

  private readonly _dbName = 'questions';

  get(query?: Query): Observable<any> {
    return query
      ? this.db.list(this._dbName, ref => ref.orderByChild(query.key).equalTo(query.value)).valueChanges()
      : this.db.list(this._dbName).valueChanges();
  }

  create(question: any): Promise<any> {
    const id = new Date().getTime() + '_'  + question.createdBy.substring(0, 3);
    return this.db.object(`${this._dbName}/${id}`).set(question);
  }
}

export interface Query {
  key: string;
  value: string;
}
