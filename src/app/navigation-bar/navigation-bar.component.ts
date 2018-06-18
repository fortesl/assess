import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/current-route.service';
import { AssessmentService } from '../common/services/assessment.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(public router: Router, public currentRoute: CurrentRouteService,
    public auth: AuthService, private assessment: AssessmentService) {
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
       { label: 'Create New', path: ['/admin/assessment/create', 'initial'], roles: ['admin'] }
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

  assessmentMenu: NavItem = {
    label: 'Assessment',
    items: []
  }

  userFirstName(): string {
    const fl = this.auth.loggedInUser.name.split(' ');
    return fl[0];
  } 

  onMenuClick(): void {
    if (this.auth.loggedInUser.email) {
      this.assessmentMenu.items.length = 0;
      if (this.auth.loggedInUser.assessments && this.auth.loggedInUser.assessments.length) {
        this.assessmentMenu.items.push({ label: 'Create New', path: ['/admin/assessment/create', 'initial'], roles: ['admin'] });
        this.auth.loggedInUser.assessments.forEach(x => this.assessmentMenu.items.push({
          label: x, path: ['/admin/assessment', x], roles: ['admin']
        }));
      }
    }
  }

  onMenuItemClick(item: NavItem) {
    if (item.label === 'Logout') {
      this.auth.logout()
        .then(x => this.router.navigate(item.path));
    } else if (item.label === 'Create New') {
      this.assessment.currentName = '';
      this.router.navigate(item.path);
    } else {
      this.router.navigate(item.path);
    }
  }

  isAuthorized(itemRoles: any[]): boolean {
    const roles = itemRoles.filter((role) => this.auth.loggedInUser.roles.includes(role));
    return roles.length > 0;
  }

}
