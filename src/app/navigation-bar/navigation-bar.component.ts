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

  navLinks: NavItem[] = [
    { label: 'Home', path: ['/'], icon: 'home' }
  ];

  navAdminDropdown: NavItem = {
    label: 'Assessment', roles: ['admin'], items: [
      { label: 'Assessment', path: ['/admin/assessment'], roles: ['admin'] },
      { label: 'Users', path: ['/admin/users/create'], roles: ['admin'] },
      { label: 'Admin Page', path: ['/admin/assessment', 'admin'], roles: ['admin'] },
      { label: 'User Page', path: ['/admin/assessment', 'user'], roles: ['admin'] },
      { label: 'Create Assessment', path: ['/superadmin/assessment/create'], roles: ['superadmin'] },
      { label: 'Questions', path: ['/admin/questions/create', 'first'], roles: ['admin'] },
      { label: 'Results', path: ['/admin/results'], roles: ['admin'] }
      ]
    };

  loggedInUserMenu: NavItem = {
    label: 'UserName',
    icon: 'person',
    items: [
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
