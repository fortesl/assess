import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit, OnDestroy {

  constructor(public assessment: AssessmentService, private route: ActivatedRoute) {
  }

  private _subscription: Subscription;
  assess;

  ngOnInit() {
    this.assessment.currentName = this.route.snapshot.params['assessment'];
    this._subscription = this.assessment.get(this.assessment.currentName)
      .subscribe(x => this.assess = x);
  }

  ngOnDestroy() {
    if (this._subscription) { this._subscription.unsubscribe(); }
  }

}
