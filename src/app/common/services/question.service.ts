import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { Question } from '../../models/question';

@Injectable()
export class QuestionService {
  constructor(private db: AngularFireDatabase) { }

  private readonly _dbName = 'questions';

  get(query?: Query): Observable<any> {
    return query
      ? this.db.list(this._dbName, ref => ref.equalTo(query.value)).valueChanges()
      : this.db.list(this._dbName).valueChanges();
  }

  getByAssessment(assessment: string): Observable<any> {
    let idx = 0;
    return this.db.list(this._dbName, ref => ref.orderByKey()).valueChanges().
      filter(x => ((x as Question)[idx++]).assessments.includes(assessment));
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
