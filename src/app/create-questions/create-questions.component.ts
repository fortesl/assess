import { Component, AfterViewInit } from '@angular/core';
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

  constructor(fb: FormBuilder, private router: Router, private assessment: AssessmentService, private question: QuestionService) { 
    this.form = fb.group({
      metadata: fb.group({
        assessment: [],
        framework: [],
        industry: [],
        field: [],
        language: [],
        areas: ['', Validators.required]
      }),
      type: ['', Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
      solution: ['', Validators.required],
      explanation: ['', Validators.required]
    });
  }
  form: FormGroup;
  submitMessage: string;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.form.get('metadata.assessment').setValue(this.assessment.currentName);
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
