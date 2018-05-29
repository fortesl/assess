import { Component, AfterViewInit, ChangeDetectorRef, Inject  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.css']
})
export class EditAssessmentComponent implements AfterViewInit {

  constructor(fb: FormBuilder, private router: Router, public assessment: AssessmentService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { 
    this.form = fb.group({
      title: [''],
      header: [''],
      content: [''],
      footer: ['']
    });
  }
  form: FormGroup;
  submitMessage: string;
  page = '';

  ngAfterViewInit() {
    this.page = this.route.snapshot.paramMap.get('userType');
    this.form.setValue(Object.assign(this.form.value, this.page === 'admin' ? this.assessment.current.adminPage : this.assessment.current.userPage));
    this.cdr.detectChanges();
  }

  submit(value) {
    this.submitMessage = 'Created Assessment ' + this.assessment.currentName;
    for (let key in value) {
      if (!value[key]) {
        value[key] = 'blank';
      }
    }
    const page = this.page === 'admin' ? { adminPage: { ...value } } : { userPage: { ...value }};
    this.assessment.create(this.assessment.currentName, page)
      .then(() => this.router.navigate(['/']))
      .catch(error => this.submitMessage = error.message);
  }

  cancel() {
    event.preventDefault();
    this.router.navigate(['/']);    
  }

}
