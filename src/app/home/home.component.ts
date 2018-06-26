import { Component, OnDestroy, AfterViewInit} from '@angular/core';
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
export class HomeComponent implements AfterViewInit, OnDestroy {

  constructor(public auth: AuthService, public assessment: AssessmentService) { }

  page: string;
  assess;
  private _subscription: Subscription;
  private _clearInterval;

  ngAfterViewInit(): void {
    this._clearInterval = setInterval(x => {
      if (this.auth.userLoginChecked) { this.getAssessment(); }
    }, 300);
  }

  private getAssessment() {
    clearInterval(this._clearInterval);
    if (this.auth.loggedInUser.assessments && this.auth.loggedInUser.assessments.length) {
      this.page = this.auth.loggedInUser.roles.includes('admin') ? 'admin' : 'user';
      const aname = this.assessment.currentName ? this.assessment.currentName : this.auth.loggedInUser.assessments[0];
      this._subscription = this.assessment.get(aname)
        .subscribe(x => {
          if (x) {
            this.assess = x;
            this.assess.name = aname;
          }
      });
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
