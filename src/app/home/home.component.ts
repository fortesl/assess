import { Component, OnInit} from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { AppUser } from '../models/app-user';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, public assessment: AssessmentService) { }

  page: string;
  assess;
  _subscription: Subscription;

  ngOnInit(): void {
    if (this.auth.loggedInUser.assessments && this.auth.loggedInUser.assessments.length) {
      this.page = this.auth.loggedInUser.roles.includes('admin') ? 'admin' : 'user';
      this._subscription = this.assessment.get(this.auth.loggedInUser.assessments[0])
        .subscribe(x => {
          this.assess = x;
          this.assess.name = this.auth.loggedInUser.assessments[0];
        });
    }
  }

}
