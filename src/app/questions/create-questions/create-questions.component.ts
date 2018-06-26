import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssessmentService } from '../../common/services/assessment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../common/services/question.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../common/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../common/database.service';
import { DialogComponent } from '../../common/dialog/dialog/dialog.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css'],
  providers: [TitleCasePipe]
})
export class CreateQuestionsComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router,
      public assessment: AssessmentService, private question: QuestionService,
      private route: ActivatedRoute, private auth: AuthService,
      public dialog: MatDialog, private db: DatabaseService, private tcp: TitleCasePipe) {
    this.form = fb.group({
      areas: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
      solution: [],
      mcOption1: [],
      mcOption2: [],
      mcOption3: [],
      mcOption4: [],
      mcOption5: [],
      mcOption6: [],
      mcOption7: [],
      mcOption1Val: [false],
      mcOption2Val: [false],
      mcOption3Val: [false],
      mcOption4Val: [false],
      mcOption5Val: [false],
      mcOption6Val: [false],
      mcOption7Val: [false],
      explanation: []
    });
    if (this.route.snapshot.params['assessment']) {
      this.assessment.currentName = this.route.snapshot.params['assessment'].toUpperCase();
    } else {
      this.assessment.currentName = undefined;
    }
  }

  private _subscription: Subscription;
  private _assesSubscription: Subscription;
  createError: boolean;

  form: FormGroup;
  submitMessage: string;
  dropdowns = [ {
    name: 'question-types',
    label: 'Question Type',
    formControl: 'type',
    items: [],
    subscription: null,
    required: true
  }, {
    name: 'levels',
    label: 'Question Level',
    formControl: 'level',
    items: [],
    subscription: null,
    required: true
  }, {
    name: 'question-durations',
    label: 'Time to Complete',
    formControl: 'duration',
    items: [],
    subscription: null,
    required: true
  }];

  page: string;

  private _numberOfMcOptions = 7;

  ngOnInit() {
    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
    });

    this.dropdowns.forEach(x => x.subscription = this.db.getList(x.name)
      .subscribe(list => x.items = list));

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.dropdowns.forEach(x => x.subscription.unsubscribe());
  }

  get description() {
    return this.form.get('description');
  }
  get type() {
    return this.form.get('type');
  }
  get mcOption1Val() {
    return this.form.get('mcOption1Val');
  }
  get mcOption2Val() {
    return this.form.get('mcOption2Val');
  }
  get mcOption3Val() {
    return this.form.get('mcOption3Val');
  }
  get mcOption4Val() {
    return this.form.get('mcOption4Val');
  }
  get mcOption5Val() {
    return this.form.get('mcOption5Val');
  }
  get mcOption6Val() {
    return this.form.get('mcOption6Val');
  }
  get mcOption7Val() {
    return this.form.get('mcOption7Val');
  }

  get mcOption1() {
    return this.form.get('mcOption1');
  }
  get mcOption2() {
    return this.form.get('mcOption2');
  }
  get mcOption3() {
    return this.form.get('mcOption3');
  }
  get mcOption4() {
    return this.form.get('mcOption4');
  }
  get mcOption5() {
    return this.form.get('mcOption5');
  }
  get mcOption6() {
    return this.form.get('mcOption6');
  }
  get mcOption7() {
    return this.form.get('mcOption');
  }
  get solution() {
    return this.form.get('solution');
  }
  get explanation() {
    return this.form.get('explanation');
  }

  togglePage(event?: Event) {
    if (event) { event.preventDefault(); }
    if (this.assessment.currentName) {
      this.page === 'first'
      ? this.router.navigate([`/admin/questions/${this.assessment.currentName}/create`, 'last'])
      : this.router.navigate([`/admin/questions/${this.assessment.currentName}/create`, 'first']);
    } else {
      this.page === 'first'
        ? this.router.navigate([`/admin/questions/create`, 'last'])
        : this.router.navigate([`/admin/questions/create`, 'first']);
}
  }

  disableSubmit(): boolean {
    let disable: boolean;
    switch (this.type.value) {
      case 'True/False':
        disable = (this.mcOption1Val.value && !this.mcOption2Val.value) || (this.mcOption2Val.value && !this.mcOption1Val.value)
         ? false
         : true;
        break;
      case 'Multiple Choice':
        disable = this.mcOption1Val.value || this.mcOption2Val.value || this.mcOption3Val.value ||
          this.mcOption4Val.value || this.mcOption5Val.value || this.mcOption5Val.value ||
          this.mcOption6Val.value || this.mcOption7Val.value
            ? false
            : true;
        break;
      case 'Essay':
        disable = this.solution.value ? false : true;
        break;
      default:
        disable = this.explanation.value ? false : true;
    }
    return disable;
  }

  other(field) {
    this.submitMessage = '';
    this.createError = false;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: field, instructions: `Please enter a value for "other" ${field}.`, get: true, input: ' '}
    });
    const dropdown = this.dropdowns.filter(x => x.formControl === field)[0];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result = this.tcp.transform(result);
        this.db.createItem(dropdown.name, { name: result, value: result.toLowerCase().replace(' ', '-') })
          .catch(error => { this.submitMessage = error.message; this.createError = true; });
  }
    });
  }

  resetMultipleChoiceOptions() {
    for (let i = 0; i < this._numberOfMcOptions; i++) {
      const option = `mcOption${i + 1}`;
      const optionVal = `mcOption${i + 1}Val`;
      this.form.get(option).setValue(null);
      this.form.get(optionVal).setValue(false);
    }
  }
  submit(value) {
    this.submitMessage = 'Question Created';
    this.createError = false;

    for (let i = 0; i < this._numberOfMcOptions; i++) {
      const option = `mcOption${i + 1}`;
      const optionVal = `mcOption${i + 1}Val`;

      if (value.type === 'True/False') {
        if (!i) { value[option] = 'True'; } else if (i === 1) { value[option] = 'False'; }
      }

      if (!value[option]) {
        value[optionVal] = null;
      }
    }

    value.createdBy = this.auth.loggedInUser.email;
    if (this.assessment.currentName) {
      value.assessments = [this.assessment.currentName];
    }

    this.question.create(value)
      .then((x) => {
        this.form.get('description').reset();
        this.form.get('explanation').reset();
        this.form.get('solution').reset();
        this.resetMultipleChoiceOptions();
        this.togglePage();
      })
      .catch(error => { this.submitMessage = error.message; this.createError = true; });

  }

  cancel(event: Event) {
    event.preventDefault();
    if (this.assessment.currentName) {
      this.router.navigate([`/admin/questions/${this.assessment.currentName}/create`, 'first']);
    } else {
      this.router.navigate([`/admin/questions/create`, 'first']);
    }
  }
}
