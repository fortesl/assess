import { Component, AfterViewInit, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/current-route.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements AfterContentChecked {
  constructor(public router: Router, public currentRoute: CurrentRouteService, public auth: AuthService) {
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

  showDropdown = false;

  navAdminDropdown: NavItem = {
    label: 'Assessment', roles: ['admin'] , items: [
       { label: 'Create new', path: ['/admin/assessment/create', 'dataPage'], roles: ['admin'] }
    ]
    //   { label: 'Users', path: ['/admin/user/create'], roles: ['admin'] },
    //   { label: 'Admin Page', path: ['/admin/assessment', 'admin'], roles: ['admin'] },
    //   { label: 'User Page', path: ['/admin/assessment', 'user'], roles: ['admin'] },
    //   { label: 'Create Assessment', path: ['/admin/assessment/create'], roles: ['admin'] },
    //   { label: 'Questions', path: ['/admin/question/create', 'first'], roles: ['admin'] },
    //   { label: 'Results', path: ['/admin/results'], roles: ['admin'] }
    //   ]
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

  ngAfterContentChecked(): void {
    if (this.auth.loggedInUser.email) {
      this.navAdminDropdown.items.length = 1;
      this.auth.loggedInUser.assessments.forEach(x => this.navAdminDropdown.items.push({
        label: x, path: ['/admin/assessment', x, 'dataPage'], roles: ['admin']
      }));
      this.showDropdown =  true;
    } else {
      this.showDropdown = false;
    }
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
