import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router, public auth: AuthService) {}

  userMenuSelection: NavItem;
  currentUrl: string;

  navLinks = [
    { label: 'Home', path: ['/'], icon: 'home' },
  ];

  loggedInUserMenu: NavItem = {
    label: 'UserName',
    icon: 'user',
    items: [
      { label: 'Create Users', path: ['/admin/users/create'], roles: ['admin'] },
      { label: 'Create Assessment', path: ['/admin/assess/create'], roles: ['admin'] },
      { label: 'Create Questions', path: ['/admin/questions/create'], roles: ['admin'] },
      { label: 'View Questions', path: ['/admin/questions/view'], roles: ['admin'] },
      { label: 'View Results', path: ['/admin/results'], roles: ['admin'] },
      { label: 'Logout', path: ['/home'] }
    ]
  };

  loggedOutUserMenu: NavItem = {
    label: 'Login',
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
