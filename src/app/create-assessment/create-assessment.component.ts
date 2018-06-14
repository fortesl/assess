import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../common/services/assessment.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog/dialog.component';
import { DatabaseService } from '../common/database.service';
import { Assessment } from '../models/assessment';
import { AuthService } from '../common/services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css'],
  providers: [TitleCasePipe]
})
export class CreateAssessmentComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public assessment: AssessmentService, private route: ActivatedRoute,
    public dialog: MatDialog, private db: DatabaseService, private auth: AuthService, private tcp: TitleCasePipe,
    private user: UserService) {
    this.form = fb.group({
      company: [],
      name: ['', Validators.required],
      description: [],
      passingGrade: [75, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      industry: ['', Validators.required],
      framework: ['', Validators.required],
      language: [],
      occupation: ['', Validators.required],
      field: [],
      level: [],
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
  private _subscription: Subscription;
  private sampleAssessment: Subscription;
  industry_subs; language_subs; occupation_subs; field_subs; framework_subs; level_subs;
  page: string;

  dropdowns = [ {
    name: 'industries',
    label: 'Industry',
    formControl: 'industry',
    items: [],
    subscription: null,
    required: true
  }, {
    name: 'occupations',
    label: 'Occupation / Job Title',
    formControl: 'occupation',
    items: [],
    subscription: null,
    required: true
  }, {
    name: 'fields',
    label: 'Field',
    formControl: 'field',
    items: [],
    subscription: null,
    required: false
  }, {
    name: 'levels',
    label: 'Level',
    formControl: 'level',
    items: [],
    subscription: null,
    required: false
  }, {
    name: 'frameworks',
    label: 'Framework',
    formControl: 'framework',
    items: [],
    subscription: null,
    required: true
  }, {
    name: 'languages',
    label: 'Programming Language',
    formControl: 'language',
    items: [],
    subscription: null,
    required: false
  }];

  ngOnInit() {
    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
    });

    this.dropdowns.forEach(x => x.subscription = this.db.getList(x.name)
      .subscribe(list => x.items = list));

    this.sampleAssessment = this.assessment.get('CUC-101')
      .subscribe(x => {
        this.form.get('adminPage').setValue(x.adminPage);
        this.form.get('userPage').setValue(x.userPage);
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.sampleAssessment.unsubscribe();
    this.dropdowns.forEach(x => x.subscription.unsubscribe());
  }

  other(field) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: field, instructions: `Please enter a value for "other" ${field}.`, get: true, input: ' '}
    });
    const dropdown = this.dropdowns.filter(x => x.formControl === field)[0];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result = this.tcp.transform(result);
        this.db.createItem(dropdown.name, { name: result, value: result.toLowerCase().replace(' ', '-') })
          .catch(error => this.submitMessage = error.message);
  }
    });
  }

  moveToPage(page: string, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/admin/assessment/create', page]);
  }

  submit(value) {
    let newAssess: Assessment;
    const now = new Date();
    const name = value.name.toUpperCase().replace(' ', '-');

    newAssess = Object.assign({}, value);
    newAssess.createDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`;
    newAssess.createdBy = this.auth.loggedInUser.email;

    this.submitMessage = 'Created Assessment ' + value.name;
    this.assessment.create(name, value)
      .then(() => {
        this.auth.loggedInUser.assessments
          ? this.auth.loggedInUser.assessments.unshift(name)
          : this.auth.loggedInUser.assessments = [name];
        this.user.setUserAssessments(this.auth.loggedInUser.uid, this.auth.loggedInUser.assessments)
          .catch(error => this.submitMessage = error.message);
        this.router.navigate(['/']);
      })
      .catch(error => this.submitMessage = error.message);
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
