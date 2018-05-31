import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../common/services/question.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements AfterViewInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router,
    private assessment: AssessmentService, private question: QuestionService, private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, private auth: AuthService) {
    this.form = fb.group({
      metadata: fb.group({
        assessmentName: [],
        framework: ['N/A'],
        industry: ['N/A'],
        ocupation: ['N/A'],
        programmingLanguage: ['N/A'],
        areas: ['', Validators.required]
      }),
      type: ['', Validators.required],
      duration: [1, Validators.required],
      level: ['Medium', Validators.required],
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
      explanation: ['', Validators.required]
    });
  }

  _subscription: Subscription;
  createError: boolean;

  form: FormGroup;
  submitMessage: string;
  questionTypes = [{
    name: 'True/False',
    value: 'True/False'
    }, {
        name: 'Multiple Choice',
        value: 'MC'
    }, {
        name: 'Essay',
        value: 'Essay'
    }
  ];
  questionDurations = [{
    name: '1 minute',
    value: 1
    }, {
      name: '5 minutes',
      value: 5
    }, {
      name: '15 minutes',
      value: 15
    }, {
      name: '30 minutes',
      value: 30
    }, {
      name: '45 minutes',
      value: 45
    }, {
      name: '1 hour',
      value: 60
    }, {
      name: '2 hours',
      value: 120
    }
  ];
  questionLevels = [{
    name: 'Senior Level',
    value: 'Senior'
    }, {
      name: 'Medium Level',
      value: 'Medium'
    }, {
      name: 'Junior Level',
      value: 'Junior'
    }, {
      name: 'Aprentice Level',
      value: 'Aprentice'
    }
  ];
  page: string;

  private _numberOfMcOptions = 7;

  ngAfterViewInit() {
    this.assessmentName.setValue(this.assessment.currentName);
    this.ocupation.setValue('Software Developer');
    this.framework.setValue('.NET');
    this.programmingLanguage.setValue('C#');
    this.areas.setValue('WCF');
    this.industry.setValue('Government Services');

    this._subscription = this.route.paramMap
    .subscribe(x => {
      this.page = x.get('page');
      this.createError = false;
      this.submitMessage = '';
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get assessmentName() {
    return this.form.get('metadata.assessmentName');
  }
  get ocupation() {
    return this.form.get('metadata.ocupation');
  }
  get framework() {
    return this.form.get('metadata.framework');
  }
  get programmingLanguage() {
    return this.form.get('metadata.programmingLanguage');
  }
  get areas() {
    return this.form.get('metadata.areas');
  }
  get industry() {
    return this.form.get('metadata.industry');
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

  togglePage() {
    event.preventDefault();
    this.page === 'first'
      ? this.router.navigate(['/admin/questions/create', 'last'])
      : this.router.navigate(['/admin/questions/create', 'first']);
  }

  disableSubmit(): boolean {
    let disable: boolean;

    if (this.type.value === 'True/False') {
      disable = (this.mcOption1Val.value && !this.mcOption2Val.value) || (this.mcOption2Val.value && !this.mcOption1Val.value)
       ? false
       : true;
    } else if (this.type.value === 'MC') {
      disable = this.mcOption1Val.value || this.mcOption2Val.value || this.mcOption3Val.value ||
        this.mcOption4Val.value || this.mcOption5Val.value || this.mcOption5Val.value || this.mcOption6Val.value || this.mcOption7Val.value
       ? false
       : true;
    } else {
      disable = this.solution.value ? false : true;
    }
    return disable;
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

    this.question.create(value)
      .then((x) => {
        this.form.get('description').reset();
        this.form.get('explanation').reset();
        this.form.get('description').reset();
        this.resetMultipleChoiceOptions();
      })
      .catch(error => this.submitMessage = error.message);

  }

  cancel() {
    event.preventDefault();
    this.router.navigate(['/admin/questions/create', 'first']);
  }
}
