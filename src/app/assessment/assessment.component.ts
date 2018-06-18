import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NavItem } from '../navigation-bar/nav-item';
import { QuestionService } from '../common/services/question.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit, OnDestroy {

  constructor(public assessment: AssessmentService, public question: QuestionService,
    private route: ActivatedRoute) {
    this.assessment.currentName = this.route.snapshot.params['assessment'];
    this.questionsLink = [`/admin/questions/${this.assessment.currentName}`];

    this.navLinks.push({ label: 'Create Users',
      path: [`/admin/users/${this.assessment.currentName}/create`], roles: ['admin'] });
    this.navLinks.push({ label: 'Create Questions',
      path: [`/admin/questions/${this.assessment.currentName}/create`, 'first'], roles: ['admin'] });
    this.navLinks.push({ label: 'View Assessment Results',
      path: [`/admin/results/${this.assessment.currentName}`], roles: ['admin'] });
  }

  private _subscription: Subscription;
  private _questionSubscription: Subscription;
  assess;
  questions;
  questionsLink;

  navLinks: NavItem[] = [];

  ngOnInit() {
    this._subscription = this.assessment.get(this.assessment.currentName)
      .subscribe(x => this.assess = x);
    this._questionSubscription = this.question.getByAssessment(this.assessment.currentName)
      .subscribe(x => this.questions = x);
  }

  ngOnDestroy() {
    if (this._subscription) { this._subscription.unsubscribe(); }
    if (this._questionSubscription) { this._questionSubscription.unsubscribe(); }
  }

}
