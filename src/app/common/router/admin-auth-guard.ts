import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { } from 'rxjs/Observable';
import { AuthService } from '@app/common/services/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { UserService } from '@app/common/services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isLoggedInUser$
      .switchMap(user => this.userService.get(user.uid))
      .map(user => {
        const allowed = user.roles.includes('admin') || user.roles.includes('superadmin');
        if (!allowed) {
          this.router.navigate(['not-authorized']);
        }
        return allowed;
      });
  }
}
