import { Component } from '@angular/core';
import { AuthService } from './common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './common/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth: AuthService, router: Router, db: UserService) {
    auth.isLoggedInUser$.subscribe((user) => {
      if (user) {
        db.updateUser(user);
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          router.navigateByUrl(returnUrl);
          localStorage.removeItem('returnUrl');
        }
      }
    });
  }
  title = 'Assess';
}
