import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})
export class CreateAssessmentComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, private assessment: AssessmentService) {
    this.form = fb.group({
      name: ['CUC-101', Validators.required],
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

  ngOnInit() {
   this.retrieveAssessment(this.name.value);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  retrieveAssessment(name: string) {
    if (name) {
      this._subscription = this.assessment.get(name)
        .subscribe(x => {
          this.form.setValue(Object.assign(this.form.value, x));
        });
    }
  }

  get name() {
    return this.form.get('name');
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
