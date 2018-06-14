import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  getList(name: string): Observable<any> {
    return this.db.list(name).valueChanges();
  }

  createItem(name: string, item: {name: string; value: any}): Promise<any> {
    const id = new Date().getTime() + '_'  + this.auth.loggedInUser.email.substring(0, 3);
    return this.db.object(`${name}/${id}`).update(item);
  }
}
