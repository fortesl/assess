import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.css']
})
export class EditAssessmentComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public assessment: AssessmentService,
    private route: ActivatedRoute) {
    this.form = fb.group({
      title: [],
      header: [],
      content: [],
      footer: []
    });
  }
  form: FormGroup;
  submitMessage: string;
  page = '';
  private _subscription: Subscription;

  ngOnInit() {
    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
    });
  }

  private retrieveAssessment(name: string) {
    if (name) {
      this._subscription = this.assessment.get(name)
        .subscribe(x => {
          this.form.setValue(Object.assign(this.form.value, x));
        });
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  submit(value) {
    this.submitMessage = 'Created Assessment ' + this.assessment.currentName;
    for (const key in value) {
      if (!value[key]) {
        value[key] = 'blank';
      }
    }
    const page = this.page === 'admin' ? { adminPage: { ...value } } : { userPage: { ...value }};
    this.assessment.create(this.assessment.currentName, page)
      .then(() => this.router.navigate(['/']))
      .catch(error => this.submitMessage = error.message);
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
