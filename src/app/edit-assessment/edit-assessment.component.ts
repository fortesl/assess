import { Component, AfterViewInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.css']
})
export class EditAssessmentComponent implements AfterViewInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public assessment: AssessmentService,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
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

  ngAfterViewInit() {
    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
      this.form.setValue(Object.assign(this.form.value, this.page === 'admin'
        ? this.assessment.current.adminPage
        : this.assessment.current.userPage));
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
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
