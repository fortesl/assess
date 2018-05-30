import { Component, Inject } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { AppUser } from '../models/app-user';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService, private assessment: AssessmentService, route: ActivatedRoute) { 
    this.page = route.snapshot.paramMap.get('page');
  }
  page = '';

  getSection(section: string): string {
    let value: string;
    if (this.assessment.current) {
      if (!this.page) {
        value = this.auth.loggedInUser.roles.includes('admin') ? this.assessment.current.adminPage[section] : this.assessment.current.userPage['section'];
      } else {
        value = this.page === 'admin' ? this.assessment.current.adminPage[section] : this.assessment.current.userPage[section];
      }
    }
    return value && value !== 'blank' ? value : '';
  }

}
