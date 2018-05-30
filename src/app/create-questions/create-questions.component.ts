import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../common/services/question.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements AfterViewInit {

  constructor(fb: FormBuilder, private router: Router,
    private assessment: AssessmentService, private question: QuestionService, private cdr: ChangeDetectorRef) {
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
      solution: ['', Validators.required],
      explanation: ['', Validators.required]
    });
  }

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

  trueFalseOptions = [{selected: false, name: 'False'}, {selected: false, name: 'True'}];
  multipleChoiceOptions = [
    {selected: false, name: 'Option Description'},
    {selected: false, name: 'Option Description'},
    {selected: false, name: 'Option Description'},
    {selected: false, name: 'Option Description'},
    {selected: false, name: 'None of the Above'},
    {selected: false, name: 'All of the above'}
  ];

  ngAfterViewInit() {
    this.assessmentName.setValue(this.assessment.currentName);
    this.ocupation.setValue('Software Developer');
    this.framework.setValue('.NET');
    this.programmingLanguage.setValue('C#');
    this.areas.setValue('WCF');
    this.industry.setValue('Government Services');
    this.cdr.detectChanges();
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

  submit(value) {
    this.submitMessage = 'Question Created';
    this.question.create(value)
      .then((x) => {
        this.form.get('description').reset();
        this.form.get('explanation').reset();
        this.form.get('description').reset();
      })
      .catch(error => this.submitMessage = error.message);
  }

  cancel() {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
