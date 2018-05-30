import { Component } from '@angular/core';
import { AuthService } from './common/services/auth.service';
import { UserService } from './common/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth: AuthService, db: UserService) {
    auth.isLoggedInUser$
      .subscribe(user => {
        if (user) {
          db.updateAppUser(user);
        }
      });
  }
  title = 'Assess';
  _subscription: Subscription;

}
