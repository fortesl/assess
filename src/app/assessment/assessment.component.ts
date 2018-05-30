import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../common/services/assessment.service';
import { NavItem } from '../navigation-bar/nav-item';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent {

  constructor(assessment: AssessmentService, private auth: AuthService, private router: Router) { 
    if (assessment.current) {
      this.name = assessment.currentName;
      this.framework = assessment.current.framework;
      this.language = assessment.current.language;
      this.ocupation = assessment.current.ocupation;
      this.industry = assessment.current.industry;  
    }
  }

  name: string;
  framework: string;
  industry: string;
  language: string;
  ocupation: string;

}
