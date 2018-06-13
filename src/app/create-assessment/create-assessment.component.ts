import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})
export class CreateAssessmentComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public assessment: AssessmentService, private route: ActivatedRoute) {
    this.form = fb.group({
      name: ['', Validators.required],
      startDate: [new Date().getTime(), Validators.required],
      endDate: [new Date().getTime(), Validators.required],
      industry: ['', Validators.required],
      framework: ['', Validators.required],
      language: ['', Validators.required],
      ocupation: ['', Validators.required],
      adminPage: fb.group({
        title: [],
        header: [],
        content: [],
        footer: []
      }),
      userPage: fb.group({
        title: [],
        header: [],
        content: [],
        footer: []
      })
    });
  }

  form: FormGroup;
  submitMessage: string;
  _subscription: Subscription;
  page: string;

  ngOnInit() {
    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
    });
  }

  get name() {
    return this.form.get('name');
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  moveToPage(page: string, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/admin/assessment/create', page]);
  }

  submit(value) {
    this._subscription.unsubscribe();
    this.submitMessage = 'Created Assessment ' + value.name;
    for (const key in value.adminPage) {
      if (!value.adminPage[key]) {
        value.adminPage[key] = 'blank';
      }
    }
    for (const key in value.userPage) {
      if (!value.userPage[key]) {
        value.userPage[key] = 'blank';
      }
    }
    this.assessment.create(value.name, value)
      .then(() => this.router.navigate(['/']))
      .catch(error => this.submitMessage = error.message);
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
