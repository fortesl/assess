import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@app/common/services/auth.service';
import { CurrentRouteService } from '@app/common/current-route.service';
import { AssessmentService } from '@app/common/services/assessment.service';

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
  ];

  loggedInUserMenu: NavItem = {
    label: 'UserName',
    icon: 'person',
    items: [
      { label: 'Create Question', path: [`/questions/create`, 'first'], roles: ['user'] },
      { label: 'Logout', path: ['/'] }
    ]
  };

  loggedOutUserMenu: NavItem = {
    label: 'Login',
    icon: 'person',
    path: ['/login']
  };

  assessmentMenu: NavItem = {
    label: 'Assessments',
    items: []
  };

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
          label: x, path: ['/admin/assessment', x], roles: ['admin'], type: 'assessment'
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
      if (item.type && item.type === 'assessment') {
        this.assessment.currentName = item.label;
      }
      this.router.navigate(item.path);
    }
  }

  isAuthorized(itemRoles: any[]): boolean {
    const roles = itemRoles.filter((role) => this.auth.loggedInUser.roles.includes(role));
    return roles.length > 0;
  }

}
