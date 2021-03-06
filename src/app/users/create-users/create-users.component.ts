import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { AssessmentService } from '../../common/services/assessment.service';
import { AppUser } from '../../models/app-user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router,
    private db: UserService, public assessment: AssessmentService, private route: ActivatedRoute) {
    this.form = fb.group({
      createUser: fb.group({
        email: ['', [
          Validators.required,
          Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z ,.'-]+$/i)]],
        role: ['user', Validators.required]
      }),
    });
    if (this.route.snapshot.params['assessment']) {
      this.assessment.currentName = this.route.snapshot.params['assessment'];
      this.usersObservable = this.db.getByAssessment(this.assessment.currentName);
    } else {
      this.assessment.currentName = undefined;
    }
  }

  form: FormGroup;
  createUserFailed = '';
  createUserSuccess = '';
  usersObservable: Observable<any>;

  ngOnInit() {
}

  get email() {
    return this.form.get('createUser.email');
  }

  get name() {
    return this.form.get('createUser.name');
  }

  get role() {
    return this.form.get('createUser.role');
  }

  submit(value) {
    this.createUserFailed = '';
    const createdUser = value.createUser;
    const password = `11${createdUser.name.split(' ')[0]}99`.toLowerCase();
    const appUser: AppUser = {
      name: createdUser.name,
      email: createdUser.email,
      roles: [createdUser.role]
    };

    if (this.assessment.currentName) {
      appUser.assessments = [this.assessment.currentName];
    }
    this.auth.createUser({email: createdUser.email, password: password})
      .then(user => {
        this.db.saveNewUser(user.uid, appUser);
        this.createUserSuccess = `${value.createUser.name} created with initial password: ${password}`;
        this.name.reset();
        this.role.setValue('user');
        this.email.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        user.updateProfile({
          displayName: name,
          photoURL: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/person.png'});
      })
      .catch(error => this.createUserFailed = error.message);
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
