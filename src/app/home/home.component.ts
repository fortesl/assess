import { Component} from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { AppUser } from '../models/app-user';
import { AssessmentService } from '../common/services/assessment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService, public assessment: AssessmentService, route: ActivatedRoute) {
    this.page = route.snapshot.paramMap.get('page');
  }
  page = '';

}
