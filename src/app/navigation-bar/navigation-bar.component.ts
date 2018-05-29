import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/current-route.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(private router: Router, public currentRoute: CurrentRouteService, public auth: AuthService) {
    router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          currentRoute.url = event.url;
        }
      });
  }

  userMenuSelection: NavItem;

  navLinks = [
    { label: 'Home', path: ['/'], icon: 'home' },
  ];

  loggedInUserMenu: NavItem = {
    label: 'UserName',
    icon: 'person',
    items: [
      { label: 'Modify Admin Page', path: ['/admin/assessment/edit', 'admin'], roles: ['admin'] },
      { label: 'Modify User Page', path: ['/admin/assessment/edit', 'user'], roles: ['admin'] },
      { label: 'Create Users', path: ['/admin/users/create'], roles: ['admin'] },
      { label: 'Create Assessment', path: ['/superadmin/assessment/create'], roles: ['superadmin'] },
      { label: 'Create Questions', path: ['/admin/questions/create'], roles: ['admin'] },
      { label: 'View Questions', path: ['/admin/questions/view'], roles: ['admin'] },
      { label: 'View Results', path: ['/admin/results'], roles: ['admin'] },
      { label: 'Logout', path: ['/'] }
    ]
  };

  loggedOutUserMenu: NavItem = {
    label: 'Login',
    icon: 'person',
    path: ['/login']
  };

  login() {
    this.router.navigate(this.loggedOutUserMenu.path);
  }

  onUserMenuClick(item: NavItem) {
    if (item.label === 'Logout') {
      this.auth.logout()
        .then(() => {
          this.router.navigate(item.path);
        });
    } else {
      this.router.navigate(item.path);
    }
  }

  isAuthorized(itemRoles: any[]): boolean {
    const roles = itemRoles.filter((role) => this.auth.loggedInUser.roles.includes(role));
    return roles.length > 0;
  }

}
