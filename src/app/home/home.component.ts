import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { AppUser } from '../models/app-user';
import { AssessmentService } from '../common/services/assessment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService, private assessment: AssessmentService) { 
  }

  getTitle(): string {
    if (this.assessment.current) {
      return this.auth.loggedInUser.roles.includes('admin') ? this.assessment.current.adminPage.title : this.assessment.current.userPage.title;
    }
    return '';
  }

  getHeader(): string {
    if (this.assessment.current) {
      return this.auth.loggedInUser.roles.includes('admin') ? this.assessment.current.adminPage.header : this.assessment.current.userPage.header;
    }
    return '';
  }

  getContent(): string {
    if (this.assessment.current) {
      return this.auth.loggedInUser.roles.includes('admin') ? this.assessment.current.adminPage.content : this.assessment.current.userPage.content;
    }
    return '';
  }

  getFooter(): string {
    if (this.assessment.current) {
      return this.auth.loggedInUser.roles.includes('admin') ? this.assessment.current.adminPage.footer : this.assessment.current.userPage.footer;
    }
    return '';
  }

}
