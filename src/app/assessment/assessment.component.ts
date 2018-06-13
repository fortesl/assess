import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { NavItem } from '../navigation-bar/nav-item';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../common/services/question.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../common/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit, OnDestroy {

  constructor(public assessment: AssessmentService, private question: QuestionService, private auth: AuthService) {
  }
  assess: any;
  questions: any[];
  _qSubsc: Subscription;
  _aSubsc: Subscription;

  ngOnInit() {
    this._aSubsc = this.assessment.get(this.auth.loggedInUser.assessments[0])
      .subscribe(x => this.assess = x);
    this._qSubsc = this.question.get()
      .subscribe(x => this.questions = x);
  }

  ngOnDestroy() {
    if (this._aSubsc) {
      this._aSubsc.unsubscribe();
    }
    if (this._qSubsc) {
      this._qSubsc.unsubscribe();
    }
  }

}
