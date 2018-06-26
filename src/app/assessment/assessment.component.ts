import { Component } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NavItem } from '../common/navigation-bar/nav-item';
import { QuestionService } from '../common/services/question.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent {

  constructor(public assessment: AssessmentService, public question: QuestionService,
    private route: ActivatedRoute) {
      this._subscription = route.paramMap
        .subscribe((x) => this.getAssessment(x.get('assessment')));
     }

  assessObservable: Observable<any>;
  questionsObservable: Observable<any>;
  questionsLink;
  private _subscription: Subscription;

  navLinks: NavItem[];

  getAssessment(assessment: string) {
    this.assessment.currentName = assessment;
    this.assessObservable  = this.assessment.get(this.assessment.currentName);
    this.questionsObservable = this.question.getByAssessment(this.assessment.currentName);
    this.questionsLink = [`/admin/questions/${this.assessment.currentName}`];

    this.navLinks = [];
    this.navLinks.push({ label: 'Create Users',
      path: [`/admin/users/${this.assessment.currentName}/create`], roles: ['admin'] });
    this.navLinks.push({ label: 'Create Questions',
      path: [`/admin/questions/${this.assessment.currentName}/create`, 'first'], roles: ['admin'] });
    this.navLinks.push({ label: 'View Assessment Results',
      path: [`/admin/results/${this.assessment.currentName}`], roles: ['admin'] });
  }

}
